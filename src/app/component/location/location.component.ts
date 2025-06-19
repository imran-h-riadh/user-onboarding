// location.component.ts
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeocodingService } from '../../geocoding.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit, OnChanges {
  @Input() address: string | undefined;
  @Output() addressChange = new EventEmitter<string>();

  @Input() lat: number | null = null;
  @Input() lng: number | null = null;

  constructor(private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    this.fetchAddress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['lat'] && changes['lat'].currentValue !== changes['lat'].previousValue) ||
      (changes['lng'] && changes['lng'].currentValue !== changes['lng'].previousValue)
    ) {
      this.fetchAddress();
    }
  }

  private fetchAddress(): void {
    if (this.lat !== null && this.lng !== null) {
      this.address = 'Fetching address...';
      this.geocodingService.getAddress(this.lat, this.lng).subscribe(
        (res) => {
          this.address = res.display_name || 'Address not found';
          this.addressChange.emit(this.address);
        },
        (error) => {
          console.error('Error fetching address:', error);
          this.address = 'Error fetching address';
          this.addressChange.emit(this.address);
        }
      );
    }
  }

  onAddressChange(newAddress: string) {
    this.addressChange.emit(newAddress);
  }
}
