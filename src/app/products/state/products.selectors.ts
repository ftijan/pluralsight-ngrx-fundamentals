import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromProducts from './products.reducer';

export const selectProductState = createFeatureSelector<fromProducts.ProductsState>('products');

export const selectProducts = createSelector(
    selectProductState,
    fromProducts.selectProducts
);

export const selectProductEntities = createSelector(
    selectProductState,
    fromProducts.selectProductEntities
);

export const selectProductsLoading = createSelector(
    selectProductState,
    (productsState) => productsState.loading
);

export const selectProductsShowProductCode = createSelector(
    selectProductState,
    (productsState) => productsState.showProductCode
);

export const selectProductsErrorMessage = createSelector(
    selectProductState,
    (productsState) => productsState.errorMessage
);

export const selectProductsTotal = createSelector(
    selectProducts,
    sumProducts // simplify since this matches signeture: (products) => sumProducts(products)
);

export const { selectRouteParams } = getRouterSelectors();

// First approach, making  a factory function:
// export const selectProductById = (id: string) => createSelector(
//     selectProducts,
//     (products) => products.find((product) => product.id === parseInt(id))
// );

// Selector composition from store approach:
export const selectProductById = createSelector(
    selectProductEntities,
    selectRouteParams,
    (productsEntities, { id }) => productsEntities[id]
);