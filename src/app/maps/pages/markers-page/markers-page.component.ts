import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public markers: MarkerAndColor[] = [];
  public currrentCenter: LngLat = new LngLat(-74.5, 40);
  public zoom: number = 13;

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currrentCenter,
      zoom: this.zoom,
    });

    this.readFromLocalStorage();
    //const markerHtml = document.createElement('div');
    //markerHtml.innerHTML = 'Carlos Coronado';

    //const maker = new Marker({ color: 'red', element: markerHtml })
    //.setLngLat(this.currrentCenter)
    //.addTo(this.map);
  }

  public createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  public addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker,
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  public deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  public flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  public saveToLocalStorage(): void {
    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });

    localStorage.setItem('plainMarker', JSON.stringify(plainMarker));
  }

  public readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarker') ?? '[]';

    const plainMarker: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarker.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    });
  }
}
