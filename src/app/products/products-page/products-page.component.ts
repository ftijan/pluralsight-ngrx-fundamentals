import { 
  Component, 
// Uncomment for Product Store usage example:
//  OnInit 
} from '@angular/core';

import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selectors';
// Uncomment for Product Store usage example:
//import { ProductsStore } from '../state/products.store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  // Uncomment for Product Store usage example:
  //providers: [ProductsStore]
})
export class ProductsPageComponent 
// Uncomment for Product Store usage example:
//implements OnInit 
{
  products$ = this.store.select(selectProducts);
  // Uncomment for Product Store usage example:
  //componentStoreProducts$ = this.productsStore.products$;
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(
    private store: Store, 
    // Uncomment for Product Store usage example:
    //private productsStore: ProductsStore
    ) {
    this.store.subscribe((store) => console.log(store));
  }

  // Uncomment for Product Store usage example:
  // ngOnInit(): void {
  //   this.productsStore.getProducts();
  // }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
