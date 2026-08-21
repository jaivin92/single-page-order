import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Product } from '../../model/product.model';


@Component({
  selector: 'app-product-catalog',
  standalone: true,
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent {

  @Input() products: Product[] = [];

  @Output() productClick =
    new EventEmitter<Product>();

  addProduct(product: Product): void {
    this.productClick.emit(product);
  }
}
