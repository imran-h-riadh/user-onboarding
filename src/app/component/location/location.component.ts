import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeocodingService } from '../../geocoding.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<p>Address: {{ address }}</p>`,
})
export class LocationComponent implements OnInit, OnChanges {
  // Allow null for inputs
  @Input() lat: number | null = null; // Removed '!' and added default null
  @Input() lng: number | null = null; // Removed '!' and added default null

  address: string = 'Fetching address...';

  constructor(private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    // Initial fetch if lat/lng are already provided (e.g., from static binding)
    this.fetchAddress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only fetch if lat or lng have actually changed and it's not the very first time
    // Or if they changed from null to a number
    if (
      (changes['lat'] && (changes['lat'].currentValue !== changes['lat'].previousValue)) ||
      (changes['lng'] && (changes['lng'].currentValue !== changes['lng'].previousValue))
    ) {
      this.fetchAddress();
    }
  }

  private fetchAddress(): void {
    // Now explicitly check if lat and lng are not null
    if (this.lat !== null && this.lng !== null) {
      this.address = 'Fetching address...';
      this.geocodingService.getAddress(this.lat, this.lng).subscribe(
        (res) => {
          this.address = res.display_name || 'Address not found';
        },
        (error) => {
          console.error('Error fetching address:', error);
          this.address = 'Error fetching address';
        }
      );
    } else {
      this.address = 'Latitude and/or longitude not provided.';
    }
  }
}