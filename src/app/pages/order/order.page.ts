import { Component, inject } from '@angular/core';

import { CategoryListComponent } from '../../component/category/category-list.component';
import { OrderPanelComponent } from '../../component/orderpanel/order-panel.component';
import { ProductCatalogComponent } from '../../component/productcatlog/product-catalog.component';
import { ReceiptComponent } from '../../component/receipt/receipt.component';
import { Product } from '../../model/product.model';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'order-page',
  templateUrl: './order.page.html',
  imports: [CategoryListComponent, ProductCatalogComponent, OrderPanelComponent, ReceiptComponent]
})
export class OrderPage {

  readonly pos = inject(PosService);

  searchText = '';

  activeCategory = 'All';

  showReceipt = false;

  get filteredProducts(): Product[] {
    const search =
      this.searchText
        .toLowerCase()
        .trim();

    return this.pos.products.filter(product => {
      const categoryMatch =
        this.activeCategory === 'All' ||
        product.cat === this.activeCategory;

      const searchMatch =
        !search ||
        product.name
          .toLowerCase()
          .includes(search);

      return categoryMatch && searchMatch;
    });
  }

  changeCategory(category: string): void {
    this.activeCategory = category;
  }

  search(value: string): void {
    this.searchText = value;
  }

  addProduct(product: Product): void {
    this.pos.addToOrder(product);
  }

  checkout(): void {
    if (this.pos.order().length === 0) {
      return;
    }

    const total =
      this.pos.formatCurrency(
        this.pos.grandTotal()
      );

    alert(
      `Payment received: ${total}\n` +
      `Ticket #A-1042 closed.`
    );

    this.pos.clearOrder();
  }

  holdOrder(): void {
    if (this.pos.order().length === 0) {
      return;
    }

    alert(
      'Order held. You can recall Ticket #A-1042 from the Holds queue.'
    );
  }

  openReceipt(): void {
    if (this.pos.order().length > 0) {
      this.showReceipt = true;
    }
  }

  closeReceipt(): void {
    this.showReceipt = false;
  }
}
