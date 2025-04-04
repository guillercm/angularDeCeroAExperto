import { Component, input } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";
import { ProductImagePipe } from "../../pipes/product-image.pipe";
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterLink, SlicePipe, SharedImageComponent, ProductImagePipe, AppTranslatePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {

  public product = input.required<Product>();

}
