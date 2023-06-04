import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-button-add-cart',
  templateUrl: './button-add-cart.component.html',
  styleUrls: ['./button-add-cart.component.scss'],
})
export class ButtonAddCartComponent {
  @Input() product: Product = new Product();
  @Input() amount: string = '0';

  addToCart() {
    const cart: Product[] =
      (localStorage.getItem('cart') &&
        JSON.parse(localStorage.getItem('cart') || '')) ||
      [];
    console.log('cart', cart);
    if (cart.length === 0) {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ ...this.product, amount: Number(this.amount) }])
      );
    } else {
      const findProduct = cart.find(
        (item: Product) => item.id === this.product.id
      );
      if (findProduct) {
        const data = cart.map((item: Product) => {
          return item.id === findProduct.id
            ? { ...item, amount: Number(item.amount) + Number(this.amount) }
            : item;
        });
        localStorage.setItem('cart', JSON.stringify(data));
      } else {
        const data = [...cart, { ...this.product, amount: this.amount }];
        localStorage.setItem('cart', JSON.stringify(data));
      }
    }
    alert('Added to cart!');
    console.log(JSON.parse(localStorage.getItem('cart') || ''));
  }
}
