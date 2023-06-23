import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  @Input()
  public lngLat?: [number, number];

  public map?: Map;
  public zoom: number = 9;

  ngAfterViewInit(): void {
    //mapa

    if (!this.divMap) throw 'El mapa aun no esta cargado';
    if (!this.lngLat) throw 'La lngLat no existe';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
      interactive: false,
    });

    //marker
    const marker = new Marker({ color: 'red' })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
