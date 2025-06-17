import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputTextarea } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    RadioButtonModule,
    HttpClientModule,
    GoogleMapsModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class OnboardingModalComponent {
  @Input() user: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveConfirmed = new EventEmitter<any>();

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

  industryOptions = [
    'Transport & Motor Vehicles',
    'Sports & Sporting Goods',
    'Consumer Goods & Culinary',
    'Travel & Vacation',
    'Business & Coaching',
    'Print, Advertising & Research',
    'Luxury Items',
    'Art, Culture & Events',
    'Finance & Law',
    'Health & Beauty',
    'IT & Telecom',
    'Real Estate, Construction & Energy'
  ];

  maxProfileImageSize = 1000000;
  maxCompanyImageSize = 5000000;
  center: google.maps.LatLngLiteral = { lat: 23.8103, lng: 90.4125 };
  zoom = 12;
  locationName: string = '';
  newTag: string = '';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    if (this.user && !this.user.company) {
      this.user.company = {
        name: '',
        description: '',
        industry: '',
        logeOffers: '',
        tags: [],
        website: '',
        owner: {
          name: '',
          position: '',
          email: '',
          phone: ''
        },
        vatNumber: ''
      };
    }
  }

  onHide() {
    this.visibleChange.emit(false);
  }

  onSave() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save these changes?',
      header: 'Confirm Save',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.saveConfirmed.emit({ ...this.user });
        this.visibleChange.emit(false);
      },
      reject: () => {
        // User cancelled - do nothing
      }
    });
  }

  getImageUrl(image: any): string {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image || '';
  }

  onProfileImageUpload(event: any) {
    if (event.files && event.files.length > 0) {
      if (event.files[0].size > this.maxProfileImageSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Profile image must be less than 1MB'
        });
        return;
      }
      this.user.profileImage = event.files[0];
    }
  }

  onCompanyLogoUpload(event: any) {
    if (event.files && event.files.length > 0) {
      if (event.files[0].size > this.maxCompanyImageSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Company logo must be less than 5MB'
        });
        return;
      }
      this.user.company.logo = event.files[0];
    }
  }

  onCompanyCoverUpload(event: any) {
    if (event.files && event.files.length > 0) {
      if (event.files[0].size > this.maxCompanyImageSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cover image must be less than 5MB'
        });
        return;
      }
      this.user.company.coverImage = event.files[0];
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

  addTag() {
    if (this.newTag && this.newTag.trim() !== '') {
      if (this.user.company.tags.length >= 15) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Maximum 15 tags allowed'
        });
        return;
      }
      if (this.newTag.length > 30) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Each tag must be less than 30 characters'
        });
        return;
      }
      this.user.company.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.user.company.tags.splice(index, 1);
  }

  toggleCompanyInfo(hasCompany: boolean) {
    this.user.hasCompanyInfo = hasCompany;
    if (!hasCompany) {
      this.user.company = null;
    } else {
      this.user.company = {
        name: '',
        description: '',
        industry: '',
        logeOffers: '',
        tags: [],
        website: '',
        owner: {
          name: '',
          position: '',
          email: '',
          phone: ''
        },
        vatNumber: ''
      };
    }
  }
}