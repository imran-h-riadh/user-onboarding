import { Component, OnInit, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from '../location/location.component'; // Import LocationComponent

// Declare google namespace to avoid TypeScript errors if you're not using @types/google.maps
// If you have @types/google.maps installed, you can remove this.
declare const google: any;

@Component({
  selector: 'app-gmap',
  standalone: true,
  imports: [CommonModule, LocationComponent], // Add LocationComponent to imports
  template: `
    <div #mapContainer style="height: 400px; width: 100%;"></div>
    <div *ngIf="lat() && lng()" style="margin-top: 10px;">
      <p>Clicked Coordinates: 📍 Lat: {{ lat() }}, Lng: {{ lng() }}</p>
      <app-location [lat]="lat()" [lng]="lng()"></app-location>
    </div>
    <div *ngIf="!lat() || !lng()" style="margin-top: 10px;">
      <p>Click on the map to get coordinates and address!</p>
    </div>
  `
})
export class GmapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  lat = signal<number | null>(null); // Initialize with null to indicate no click yet
  lng = signal<number | null>(null); // Initialize with null

  // We are no longer using 'address' signal directly in GmapComponent
  // because LocationComponent will handle fetching and displaying the address.
  // address = signal<string>('');

  ngOnInit(): void {
    // Basic check for google object to ensure API is loaded
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API not loaded. Ensure your index.html script tag is correct and has your API key.');
      return;
    }

    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 23.8103, lng: 90.4125 }, // Default center for Dhaka
      zoom: 13
    });

    const marker = new google.maps.Marker({ map });

    // Note: The Geocoder here is for the GmapComponent to possibly display address
    // directly if needed, but for passing to LocationComponent, LocationComponent's
    // own geocoding service is more appropriate.
    // However, if you want GmapComponent to *also* show its own interpretation
    // of the address using Google's Geocoder, you would use this.
    // const geocoder = new google.maps.Geocoder();

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      const latLng = e.latLng;
      if (latLng) {
        this.lat.set(latLng.lat());
        this.lng.set(latLng.lng());
        marker.setPosition(latLng);

        // You could use Google's Geocoder here to get address for GmapComponent itself
        // if you wanted to display it here instead of relying solely on LocationComponent.
        // For now, we're relying on LocationComponent's GeocodingService.
      }
    });
  }
}