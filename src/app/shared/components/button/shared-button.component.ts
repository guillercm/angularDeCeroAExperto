import { RouterLink } from '@angular/router';
import { ButtonsSizes } from './interfaces/button-sizes.type';
import { ButtonVariants } from './interfaces/button-variants.type';
import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonType } from './interfaces/button-types.type';

@Component({
  selector: 'shared-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.css'
})
export class SharedButtonComponent {

  public label = input<string>('');

  public title = input<string>('');

  public disabled = input<boolean>(false);

  public link = input<string | null | undefined>(null);

  public type = input<ButtonType>('button');

  public variant = input<ButtonVariants>('primary');

  public outline = input<boolean>(false);

  public size = input<ButtonsSizes>('default');

  public additionalClasses = input<string>('');

  public icon = input<string>('');

  public fontSizeIcon = input<1 | 2 | 3 | 4 | 5 | 6>(6);

  public clicked = output();

  protected readonly classes = computed(() => {
    return `w-100 btn btn-${(this.outline() ? 'outline-' : '') + this.variant() + (this.size() ? ` btn-${this.size()} ` : ' ') + this.additionalClasses()}`
  })

  click() {
    this.clicked.emit();
  }

}
