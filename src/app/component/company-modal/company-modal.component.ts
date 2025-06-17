import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextarea } from 'primeng/inputtextarea';

@Component({
  selector: 'app-company-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule
  ],
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.css']
})
export class CompanyModalComponent {
  @Input() company: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();

  industries = [
    { label: 'Transport & Motor Vehicles', value: 'Transport & Motor Vehicles' },
    { label: 'Sports & Sporting Goods', value: 'Sports & Sporting Goods' },
    { label: 'Consumer Goods & Culinary', value: 'Consumer Goods & Culinary' },
    { label: 'Travel & Vacation', value: 'Travel & Vacation' },
    { label: 'Business & Coaching', value: 'Business & Coaching' },
    { label: 'Print, Advertising & Research', value: 'Print, Advertising & Research' },
    { label: 'Luxury Items', value: 'Luxury Items' },
    { label: 'Art, Culture & Events', value: 'Art, Culture & Events' },
    { label: 'Finance & Law', value: 'Finance & Law' },
    { label: 'Health & Beauty', value: 'Health & Beauty' },
    { label: 'IT & Telecom', value: 'IT & Telecom' },
    { label: 'Real Estate, Construction & Energy', value: 'Real Estate, Construction & Energy' }
  ];

  maxFileSize = 5000000;

  onHide() {
    this.visibleChange.emit(false);
  }

  onSave() {
    this.save.emit({ ...this.company });
  }

  onLogoUpload(event: any) {
    if (event.files && event.files.length > 0) {
      this.company.logo = event.files[0];
    }
  }

  onCoverUpload(event: any) {
    if (event.files && event.files.length > 0) {
      this.company.coverImage = event.files[0];
    }
  }

  addTag(event: any) {
    const value = event.value;
    if (value) {
      if (!this.company.tags) {
        this.company.tags = '';
      }
      const tags = this.company.tags.split(',').filter((tag: string) => tag.trim());
      if (tags.length < 15 && value.length <= 30) {
        tags.push(value.trim());
        this.company.tags = tags.join(', ');
      }
    }
  }
}