import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  totalPrice: number = 0;

  fullName: string = '';
  address: string = '';
  creditCard: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const cart =
      localStorage.getItem('cart') &&
      (JSON.parse(localStorage.getItem('cart') || '') || []);

    this.products = [...cart];
    this.totalPrice = Number(
      this.products
        .reduce((value, nextValue) => {
          return value + nextValue.price * Number(nextValue.amount);
        }, 0)
        .toFixed(2)
    );
  }

  changeAmount(data: Product) {
    console.log('changeAmount', data);
    this.products = this.products.map((item: Product) =>
      item.id === data.id ? data : item
    );
    localStorage.setItem('cart', JSON.stringify(this.products));
    this.totalPrice = Number(
      this.products
        .reduce((value, nextValue) => {
          return value + nextValue.price * Number(nextValue.amount);
        }, 0)
        .toFixed(2)
    );
  }

  handleSubmit() {
    this.clearCart();
  }

  clearCart() {
    this.router.navigateByUrl(
      `confirmation?fullName=${this.fullName}&totalPrice=${this.totalPrice}`
    );
    this.products = [];
    localStorage.setItem('cart', '');
    this.fullName = '';
    this.address = '';
    this.creditCard = '';
    this.totalPrice = 0;
  }
}
