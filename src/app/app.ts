import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/component/header/header.component";
import { TopbarComponent } from "./shared/component/topbar/topbar.component";
import { PosService } from './services/pos.service';
import { SeoService } from './services/seo.service';
import { CategoryListComponent } from "./component/category/category-list.component";
import { ProductCatalogComponent } from "./component/productcatlog/product-catalog.component";
import { OrderPanelComponent } from "./component/orderpanel/order-panel.component";
import { ReceiptComponent } from "./component/receipt/receipt.component";

@Component({
  selector: 'app-root',
  imports: [TopbarComponent, CategoryListComponent, ProductCatalogComponent, OrderPanelComponent, ReceiptComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('single-page-order');

  readonly pos = inject(PosService);

  private readonly seo = inject(SeoService);

  searchText = '';

  activeCategory = 'All';

  showReceipt = false;

  constructor() {
    this.seo.init();
  }

  get filteredProducts() {

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

  addProduct(product: any): void {
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
    console.log("APP  Print ")
    if (this.pos.order().length > 0) {
      this.showReceipt = true;
    }
  }

  closeReceipt(): void {
    this.showReceipt = false;
  }
}
