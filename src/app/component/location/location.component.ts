import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeocodingService } from '../../geocoding.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<p>Address: {{ address }}</p>`,
})
export class LocationComponent implements OnInit {
  address: string = '';

  constructor(private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    const lat = 23.8103;
    const lng = 90.4125;

    this.geocodingService.getAddress(lat, lng).subscribe((res) => {

      this.address = res.display_name;

    });
  }
}
