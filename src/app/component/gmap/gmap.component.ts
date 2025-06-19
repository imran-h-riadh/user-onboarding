// gmap.component.ts
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from '../location/location.component';
import { FormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-gmap',
  standalone: true,
  imports: [CommonModule, LocationComponent, FormsModule],
  template: `
    <div #mapContainer style="height: 270px; width: 500px"></div>

    <div *ngIf="lat() && lng()" style="margin-top: 10px;">
      <app-location
        [(address)]="address"
        [lat]="lat()"
        [lng]="lng()"
        (addressChange)="onAddressChange($event)"
      ></app-location>
    </div>
  `
})
export class GmapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() address: string | undefined;
  @Output() addressChange = new EventEmitter<string>();

  lat = signal<number | null>(null);
  lng = signal<number | null>(null);

  ngOnInit(): void {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API not loaded.');
      return;
    }

    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 23.8103, lng: 90.4125 },
      zoom: 13,
    });

    const marker = new google.maps.Marker({ map });

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      const latLng = e.latLng;
      if (latLng) {
        this.lat.set(latLng.lat());
        this.lng.set(latLng.lng());
        marker.setPosition(latLng);
      }
    });
  }

  onAddressChange(newAddress: string) {
    this.address = newAddress;
    this.addressChange.emit(newAddress);
  }
}
