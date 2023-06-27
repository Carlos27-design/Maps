import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  routing: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'Fullscreen', routing: '/maps/fullscreen' },
    { name: 'Zoom Range', routing: '/maps/zoom' },
    { name: 'Markers', routing: '/maps/markers' },
    { name: 'Houses', routing: '/maps/properties' },
    { name: 'Alone Page', routing: '/alone' },
  ];
}
