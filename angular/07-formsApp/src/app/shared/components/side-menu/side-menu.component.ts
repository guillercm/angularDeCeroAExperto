import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
    selector: 'shared-side-menu',
    templateUrl: './side-menu.component.html',
    styles: [],
    standalone: false
})
export class SideMenuComponent {

  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ];

  public selectorsMenu: MenuItem[] = [
    { title: 'Países', route: './selector' },
  ];

  public lifeCycleMenu: MenuItem[] = [
    { title: 'Productos', route: './lifeCycle/product' },
    { title: 'Life Cycle Hooks', route: './lifeCycle/lifeCycleHooks' },
  ];

  public directiveSignals: MenuItem[] = [
    { title: 'Directives', route: './directives' },
    { title: 'Signals', route: './signals' },
  ];

}
