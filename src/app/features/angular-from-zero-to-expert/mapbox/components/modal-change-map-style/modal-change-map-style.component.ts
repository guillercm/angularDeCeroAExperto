import { Component, computed, inject } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { CommonModule } from '@angular/common';
import { dataStyleMap } from '../../interfaces/dataStyleMap.interface';
import { SharedImageComponent } from "../../../../../shared/components/image/shared-image.component";
import { StylesMapsService } from '../../services/styles-maps.service';
import { AppTranslatePipe } from '@core/pipes/app-translate.pipe';

@Component({
  selector: 'features-mapbox-modal-change-map-style',
  imports: [CommonModule, SharedImageComponent, AppTranslatePipe],
  templateUrl: './modal-change-map-style.component.html',
  styleUrl: './modal-change-map-style.component.css'
})
export class ModalChangeMapStyleComponent {
  private readonly _mapsService = inject(MapsService);

  private readonly _stylesMapsService = inject(StylesMapsService);

  protected readonly dataStylesMap = computed(() => this._mapsService.dataStylesMap())

  protected readonly actualStyle = computed(() => this._stylesMapsService.actualStyle())

  protected changeMapStyle(style: dataStyleMap): void {
    this._mapsService.setStyle(style.mapboxStyle);
  }
}
