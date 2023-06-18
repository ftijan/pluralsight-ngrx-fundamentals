import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productsService: ProductsService
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            // concatMap avoids race conditions, but less performant
            // other options with possible race conditions:
            // mergeMap (for parallel reqs & order unimportant),
            // switchMap (get & cancellable requests like searches),
            // exhaustMap (ignores subsequent reqs until initial completes)
            exhaustMap(() => 
                this.productsService
                    .getAll()
                    .pipe(
                        map((products) =>
                            ProductsAPIActions.productsLoadedSuccess({ products })
                        ),
                        catchError(
                            (error) => of(ProductsAPIActions.productsLoadedFail({ message: error}))
                        )
                    )
            )
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.addProduct),
            mergeMap(({product}) => 
                this.productsService
                    .add(product)
                    .pipe(
                        map((newProduct) =>
                            ProductsAPIActions.productAddedSuccess({ product: newProduct })
                        ),
                        catchError(
                            (error) => of(ProductsAPIActions.productAddedFail({ message: error}))
                        )
                    )
            )
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.updateProduct),
            concatMap(({product}) => 
                this.productsService
                    .update(product)
                    .pipe(
                        map(() =>
                            ProductsAPIActions.productUpdatedSuccess({ product })
                        ),
                        catchError(
                            (error) => of(ProductsAPIActions.productUpdatedFail({ message: error}))
                        )
                    )
            )
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.deleteProduct),
            concatMap(({id}) => 
                this.productsService
                    .delete(id)
                    .pipe(
                        map(() =>
                            ProductsAPIActions.productDeletedSuccess({ id })
                        ),
                        catchError(
                            (error) => of(ProductsAPIActions.productDeletedFail({ message: error}))
                        )
                    )
            )
        )
    );
}