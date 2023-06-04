import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  @Input() product: Product = new Product();
  amount: number = this.product.amount;
  @Output() changeAmount = new EventEmitter();

  ngOnInit(): void {
    this.amount = this.product.amount;
  }

  handleChangeAmount() {
    this.changeAmount.emit({ ...this.product, amount: Number(this.amount) });
  }
}
