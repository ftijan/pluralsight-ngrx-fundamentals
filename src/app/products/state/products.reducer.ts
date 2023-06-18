import { createAction, createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProductCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

const initialState: ProductsState = {
    showProductCode: true,
    loading: false,
    products: [],
    errorMessage: ''
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        products: [],
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsLoadedSuccess, (state, {products}) => ({
        ...state,
        loading: false,
        products
    })),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
        ...state,
        products: [],
        errorMessage: message,
        loading: false,
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',        
    })),
    on(ProductsAPIActions.productAddedSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product],        
        loading: false,
    })),
    on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
        ...state,        
        errorMessage: message,
        loading: false,
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',        
    })),
    on(ProductsAPIActions.productUpdatedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products.map((existingProduct) => 
            existingProduct.id === product.id ? product : existingProduct
        ),
    })),
    on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
        ...state,        
        errorMessage: message,
        loading: false,
    })),
    on(ProductsPageActions.deleteProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',        
    })),
    on(ProductsAPIActions.productDeletedSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        products: state.products.filter((existingProduct) => 
            existingProduct.id !== id
        ),
    })),
    on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
        ...state,        
        errorMessage: message,
        loading: false,
    })),
)
