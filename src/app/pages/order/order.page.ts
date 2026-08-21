import { Component } from "@angular/core";
import { ProductViewComponent } from "../../component/productview/productview.component";
import { OrderViewComponent } from "../../component/orderview/orderview.component";

@Component({
  selector : 'order-page',
  templateUrl : './order.page.html',
  imports: [ProductViewComponent, OrderViewComponent]
})

export class OrderPage {

}
