import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = new Product();
  amount: string = '1';

  @Output() addToCart = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log("product", this.product)
  }

  getData(data: any) {
    console.log('data', data);
  }

  navigateToDetail(id: number) {
    this.router.navigateByUrl('/product-detail/' + id);
  }
}
