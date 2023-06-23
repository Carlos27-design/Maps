import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 9;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter,
      zoom: this.zoom,
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  public mapListener(): void {
    if (!this.map) throw 'Mapa no se ha inicializasdo';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    });
    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
      const { lng, lat } = this.currentCenter;
    });
  }

  public zoomIn(): void {
    this.map?.zoomIn();
  }
  public zoomOut(): void {
    this.map?.zoomOut();
  }

  public zoomChanged(value: string): void {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
