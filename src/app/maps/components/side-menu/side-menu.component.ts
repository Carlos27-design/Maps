import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  routing: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'Fullscreen', routing: '/maps/fullscreen' },
    { name: 'Zoom Range', routing: '/maps/zoom' },
    { name: 'Markers', routing: '/maps/markers' },
    { name: 'Houses', routing: '/maps/properties' },
  ];
}
