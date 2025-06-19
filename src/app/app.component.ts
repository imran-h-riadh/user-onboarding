import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { OnboardingModalComponent } from './component/onboarding-modal/onboarding-modal.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MemberOnboardingFormComponent } from "./component/member-onboarding-form/member-onboarding-form.component";

interface SubscriptionInfo {
  label: string;
  value: string;
  credits: number;
  maxBookings: number;
  slots: number;
}

interface CompanyOwner {
  name: string;
  position: string;
  email: string;
  phone: string;
}

interface Company {
  name: string;
  logo: string | null;
  coverImage: string | null;
  description: string;
  industry: string;
  logeOffers: string;
  tags: string[];
  website: string;
  owner: CompanyOwner;
  vatNumber: string;
}

interface User {
  id: number;
  fullName: string;
  emailAddress: string;
  dateAdded: Date;
  subscriptionModel: string;
  subscriptionInfo: SubscriptionInfo;
  profileImage: string | null;
  position: string;
  phoneNumber: string;
  address: string;
  languagePreference: string;
  condition: File | null;
  hasCompanyInfo: boolean;
  company: Company | null; // This can be either a Company object or null
}

interface UserType {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    OnboardingModalComponent,
    HttpClientModule,
    SelectButtonModule,
    ToastModule,
    ConfirmDialogModule,
    MemberOnboardingFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  userTypes: UserType[] = [
    { name: 'Admin' },
    { name: 'Ambassador' },
    { name: 'Golf Club' },
    { name: 'Member' },
  ];

  users: User[] = [
    {
      id: 2,
      fullName: 'Bob Williams',
      emailAddress: 'bob.w@example.com',
      dateAdded: new Date('2023-03-20T11:30:00Z'),
      subscriptionModel: 'Business Plus',
      subscriptionInfo: {
        label: 'Business Plus',
        value: 'BusinessPlus',
        credits: 10000,
        maxBookings: 5,
        slots: 5
      },
      profileImage: 'https://example.com/profiles/bob.jpg',
      position: 'Marketing Director',
      phoneNumber: '0987654321',
      address: '456 Oak Ave, Los Angeles, CA',
      languagePreference: 'EN',
      condition: null,

      hasCompanyInfo: true,
      company: {
        name: 'Global Marketing Solutions',
        logo: null,
        coverImage: 'https://example.com/companies/gms_cover.jpg',
        description: 'Specializing in digital marketing strategies.',
        industry: 'Travel & Vacation',
        logeOffers: 'Comprehensive marketing audits',
        tags: ['digital marketing', 'SEO', 'branding'],
        website: 'https://globalmarketing.com',
        owner: {
          name: 'Bob Williams',
          position: 'Co-Founder',
          email: 'bob@globalmarketing.com',
          phone: '0987654321'
        },
        vatNumber: 'US987654321'
      }
    }, {
      id: 3,
      fullName: 'Charlie Green',
      emailAddress: 'charlie.g@example.com',
      dateAdded: new Date('2023-05-01T09:00:00Z'),
      subscriptionModel: 'Premium Annual',
      subscriptionInfo: {
        label: 'Premium Annual',
        value: 'PremiumAnnual',
        credits: 20000,
        maxBookings: 10,
        slots: 10
      },
      profileImage: null,
      position: 'HR Manager',
      phoneNumber: '1122334455',
      address: '789 Pine Ln, Chicago, IL',
      languagePreference: 'ES',
      condition: null,
      hasCompanyInfo: true,
      company: {
        name: 'Dynamic Staffing Co.',
        logo: 'https://example.com/companies/dynamic_logo.png',
        coverImage: null,
        description: 'Your partner in talent acquisition and HR solutions.',
        industry: 'Travel & Vacation',
        logeOffers: 'Executive search services, HR consulting',
        tags: ['recruitment', 'HR', 'staffing'],
        website: 'https://dynamicstaffing.com',
        owner: {
          name: 'Charlie Green',
          position: 'CEO',
          email: 'charlie@dynamicstaffing.com',
          phone: '1122334455'
        },
        vatNumber: 'US456789012'
      }
    }, {
      id: 4,
      fullName: 'Diana Prince',
      emailAddress: 'diana.p@example.com',
      dateAdded: new Date('2024-02-10T14:00:00Z'),
      subscriptionModel: 'Free Tier',
      subscriptionInfo: {
        label: 'Free Tier',
        value: 'FreeTier',
        credits: 500,
        maxBookings: 1,
        slots: 1
      },
      profileImage: 'https://example.com/profiles/diana.png',
      position: 'Freelance Designer',
      phoneNumber: '5551234567',
      address: '101 Art St, Seattle, WA',
      languagePreference: 'EN',
      condition: null,

      hasCompanyInfo: false, // No company info for this user
      company: null // Company object is null
    }, {
      id: 5,
      fullName: 'Eve Adams',
      emailAddress: 'eve.a@example.com',
      dateAdded: new Date('2024-04-05T08:00:00Z'),
      subscriptionModel: 'Economy Class',
      subscriptionInfo: {
        label: 'Economy Class',
        value: 'EconomyClass',
        credits: 4500,
        maxBookings: 2,
        slots: 2
      },
      profileImage: null,
      position: 'Student',
      phoneNumber: '0123456789',
      address: '202 University Ave, Boston, MA',
      languagePreference: 'FR',
      condition: null,
      hasCompanyInfo: false, // No company info for this user
      company: null // Company object is null
    }
  ];

  selectedUserType: UserType | undefined;
  loading = false;
  modalVisible = false;
  selectedUser: User | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.sortData();
  }

  private sortData(): void {
    this.users = [...this.users].sort((a, b) =>
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(filterValue, 'contains');
  }

  clear(): void {
    this.dt.clear();
    this.dt.sortField = 'dateAdded';
    this.dt.sortOrder = -1;
    this.dt.sortSingle();
    this.selectedUserType = undefined;
  }

  showUserDetails(user: User): void {
    this.selectedUser = JSON.parse(JSON.stringify(user));
    this.modalVisible = true;
  }

  onUserSaved(updatedUser: User): void {
    console.log(updatedUser);
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users = [
        ...this.users.slice(0, index),
        { ...updatedUser },
        ...this.users.slice(index + 1)
      ];
      this.sortData();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User updated successfully'
      });
    }
    this.modalVisible = false;
  }

  getUsers(): User[] {
    return this.users;
  }


}