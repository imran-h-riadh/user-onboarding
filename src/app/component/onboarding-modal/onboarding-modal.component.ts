import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    RadioButtonModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.css']
})
export class OnboardingModalComponent {
  @Input() user: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();

  subscriptionOptions = [
    { label: 'Economy Class', value: 'Economy Class', credits: 4500, maxBookings: 2, slots: 2 },
    { label: 'Business Class', value: 'Business Class', credits: 9000, maxBookings: 2, slots: 2 },
    { label: 'First Class', value: 'First Class', credits: 18000, maxBookings: 4, slots: 2 },
    { label: 'Executive Class', value: 'Executive Class', credits: 27000, maxBookings: 6, slots: 2 }
  ];

  languageOptions = [
    { label: 'German', value: 'DE' },
    { label: 'English', value: 'EN' },
    { label: 'Italian', value: 'IT' }
  ];

  maxFileSize = 1000000;
  center: google.maps.LatLngLiteral = { lat: 23.8103, lng: 90.4125 };
  zoom = 12;
  locationName: string = '';

  onHide() {
    this.visibleChange.emit(false);
  }

  onSave() {
    this.save.emit({ ...this.user });
  }

  onUpload(event: any) {
    if (event.files && event.files.length > 0) {
      this.user.profileImage = event.files[0];
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.user.latitude = lat;
      this.user.longitude = lng;
      this.getAddress(lat, lng);
    }
  }

  getAddress(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        this.locationName = results[0].formatted_address;
        this.user.address = this.locationName;
      } else {
        this.locationName = 'Address not found';
      }
    });
  }
}