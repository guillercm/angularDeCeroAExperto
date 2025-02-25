import { Component, input, effect, signal, inject, computed, Signal, viewChild, ElementRef, viewChildren } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {  delay, of, take } from 'rxjs';
import { DataCode } from './interfaces/data-code.interface';
import { SharedImageComponent } from "../image/shared-image.component";
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'shared-code-block',
  imports: [SharedImageComponent],
  templateUrl: './shared-code-block.component.html',
  styleUrl: './shared-code-block.component.css'
})
export class SharedCodeBlockComponent {

  private readonly _clipboard = inject(Clipboard)

  private readonly _themeService = inject(ThemeService);

  private readonly pres = viewChildren<ElementRef>('pre')

  public code = input.required<string | DataCode[]>()

  /* Properties if code is string */
  public label = input<string>("");

  /* Properties if code is DataCode[] */
  protected indexCodeActive = signal<number>(0);

  public type = input<'code' | 'terminal'>('code');

  private _codeprettier = signal<string>("")
  protected readonly codeprettier = this._codeprettier.asReadonly()

  private _showButtonCopied = signal<boolean>(false);
  protected readonly showButtonCopied = this._showButtonCopied.asReadonly();

  public readonly theme = this._themeService.theme


  protected readonly getDataCode: Signal<DataCode[]> = computed(() => {
    let code = this.code();
    if (typeof code === "string") return [{
      label: this.label(),
      code: code
    }];
    //console.log(code)
    return code;
  })

  public effectCode = effect(() => {
    let dataCode = this.getDataCode();
    this._codeprettier.set(dataCode[this.indexCodeActive()].code);
  })

  changeCodeActive(index: number) {
    this.indexCodeActive.set(index);
  }

  protected copyCode() {
    this._showButtonCopied.set(true);
    const exp = /<span class="token[^>]*>(.*?)<\/span>/g;
    this._clipboard.copy(this.codeprettier().replace(exp, '$1').replace(exp, '$1').replace(exp, '$1').replaceAll("&gt;", ">"))
    of(true).pipe(
      take(1),
      delay(1000)
    ).subscribe(() => {
      this._showButtonCopied.set(false);
    })
  }

}
