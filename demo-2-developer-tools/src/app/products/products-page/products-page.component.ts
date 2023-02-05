import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode$ = this.store.select(
    (state: any) => state.products.showProductCode
  );

  constructor(private productsService: ProductsService, private store: Store) {}

  ngOnInit() {
    this.getProducts();
    this.store.subscribe((state) =>
      console.log('Log Store From Products Page: ', state)
    );
  }

  getProducts() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.total = sumProducts(products);
      this.loading = false;
    });
  }

  toggleShowProductCode() {
    this.store.dispatch({ type: '[Products Page] Toggle Show Product Code' });
  }
}
