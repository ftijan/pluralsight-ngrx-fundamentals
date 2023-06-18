import { createAction, createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProductCode: boolean;
    loading: boolean;
    products: Product[];
}

const initialState: ProductsState = {
    showProductCode: true,
    loading: false,
    products: [],
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true
    })),
    on(ProductsAPIActions.productsLoadedSuccess, (state, {products}) => ({
        ...state,
        loading: false,
        products
    }))
)
