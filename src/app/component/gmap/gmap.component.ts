import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #mapContainer style="height: 400px;"></div>
    <p *ngIf="lat && lng">📍 Lat: {{ lat }}, Lng: {{ lng }}</p>
  `
})
export class GmapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  lat!: number;
  lng!: number;

  ngOnInit(): void {
    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 23.8103, lng: 90.4125 },
      zoom: 13
    });

    const marker = new google.maps.Marker({ map });

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      this.lat = e.latLng?.lat() || 0;
      this.lng = e.latLng?.lng() || 0;

      marker.setPosition(e.latLng);
      console.log('Latitude:', this.lat, 'Longitude:', this.lng);

    });
  }
}
