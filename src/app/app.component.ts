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
import { CompanyModalComponent } from './component/company-modal/company-modal.component';
import { LocationComponent } from './component/location/location.component';
import { GmapComponent } from "./component/gmap/gmap.component";
import { SelectButtonModule } from 'primeng/selectbutton';

interface SubscriptionInfo {
  label: string;
  value: string;
  credits: number;
  maxBookings: number;
  slots: number;
}

interface User {
  id: number,
  fullName: string;
  emailAddress: string;
  dateAdded: Date;
  companyName?: string;
  subscriptionModel: string;
  subscriptionInfo: SubscriptionInfo;
  position: string;
  phoneNumber: string;
  location: string;
  languagePreference: string;
}

interface UserType {
  name: string;
}

interface Company {
  name: string;
  email: string;
  dateAdded: Date;
  description?: string;
  logo: string | null;
  coverImage: string | null;
  industry: string;
  logeOffers: string;
  tags: string;
  website: string;
  ownerName: string;
  ownerPosition: string;
  ownerEmail: string;
  ownerPhone: string;
  vatNumber: string;
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
    CompanyModalComponent,
    HttpClientModule,
    LocationComponent,
    GmapComponent,
    SelectButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  @ViewChild('companyTable') companyTable!: Table;

  userTypes: UserType[] = [
    { name: 'Admin' },
    { name: 'Ambassador' },
    { name: 'Company' },
    { name: 'User' },
  ];

  users: User[] = [
    {
      id: 1,
      fullName: 'Alice Johnson',
      emailAddress: 'alice.j@example.com',
      dateAdded: new Date('2023-01-15T10:00:00Z'),
      companyName: 'Tech Innovators Inc.',
      subscriptionModel: 'Economy Class',
      subscriptionInfo: {
        label: 'Economy Class',
        value: 'Economy Class',
        credits: 4500,
        maxBookings: 2,
        slots: 2
      },
      position: 'CEO',
      phoneNumber: '00000',
      location: '',
      languagePreference: 'EN'
    },
    {
      id: 2,
      fullName: 'Bob Smith',
      emailAddress: 'bob.s@example.com',
      dateAdded: new Date('2023-03-22T14:30:00Z'),
      companyName: 'Global Solutions Ltd.',
      subscriptionModel: 'Economy Class',
      subscriptionInfo: {
        label: 'Economy Class',
        value: 'Economy Class',
        credits: 4500,
        maxBookings: 2,
        slots: 2
      },
      position: 'CEO',
      phoneNumber: '00000',
      location: '',
      languagePreference: 'EN'
    },
    {
      id: 3,
      fullName: 'Charlie Brown',
      emailAddress: 'charlie.b@example.com',
      dateAdded: new Date('2023-05-01T09:15:00Z'),
      subscriptionModel: 'Economy Class',
      subscriptionInfo: {
        label: 'Economy Class',
        value: 'Economy Class',
        credits: 4500,
        maxBookings: 2,
        slots: 2
      },
      position: 'CEO',
      phoneNumber: '00000',
      location: '',
      languagePreference: 'EN'
    },
    {
      id: 4,
      fullName: 'Diana Prince',
      emailAddress: 'diana.p@example.com',
      dateAdded: new Date('2023-07-10T11:45:00Z'),
      companyName: 'Wonder Corp.',
      subscriptionModel: 'Economy Class',
      subscriptionInfo: {
        label: 'Economy Class',
        value: 'Economy Class',
        credits: 4500,
        maxBookings: 2,
        slots: 2
      },
      position: 'CEO',
      phoneNumber: '00000',
      location: '',
      languagePreference: 'EN'
    }
  ];

  companies: Company[] = [
    {
      name: 'Tech Innovators Inc.',
      email: 'info@techinnovators.com',
      dateAdded: new Date('2023-01-10T09:00:00Z'),
      description: 'Innovative technology solutions provider',
      logo: null,
      coverImage: null,
      industry: '',
      logeOffers: '',
      tags: '',
      website: '',
      ownerName: '',
      ownerPosition: '',
      ownerEmail: '',
      ownerPhone: '',
      vatNumber: ''
    },
    {
      name: 'Global Solutions Ltd.',
      email: 'contact@globalsolutions.com',
      dateAdded: new Date('2023-03-15T11:30:00Z'),
      description: 'Worldwide business consulting',
      logo: null,
      coverImage: null,
      industry: '',
      logeOffers: '',
      tags: '',
      website: '',
      ownerName: '',
      ownerPosition: '',
      ownerEmail: '',
      ownerPhone: '',
      vatNumber: ''
    }
  ];

  selectedUserType: UserType | undefined;
  loading = false;
  modalVisible = false;
  companyModalVisible = false;
  selectedUser: User | null = null;
  selectedCompany: Company | null = null;

  ngOnInit() {
    this.sortData();
  }

  private sortData(): void {
    this.users = [...this.users].sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
    this.companies = [...this.companies].sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(filterValue, 'contains');
  }

  applyCompanyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyTable.filterGlobal(filterValue, 'contains');
  }

  clear(): void {
    this.dt.clear();
    this.dt.sortField = 'dateAdded';
    this.dt.sortOrder = -1;
    this.dt.sortSingle();
    this.selectedUserType = undefined;
  }

  clearCompanyFilter(): void {
    this.companyTable.clear();
    this.companyTable.sortField = 'dateAdded';
    this.companyTable.sortOrder = -1;
    this.companyTable.sortSingle();
  }

  showUserDetails(user: User): void {
    this.selectedUser = { ...user };
    this.modalVisible = true;
  }

  showCompanyDetails(company: Company): void {
    this.selectedCompany = { ...company };
    this.companyModalVisible = true;
  }

  onUserSaved(updatedUser: User): void {
    const index = this.users.findIndex(u => u.emailAddress === updatedUser.emailAddress);
    console.log(updatedUser);
    if (index !== -1) {
      this.users = [
        ...this.users.slice(0, index),
        { ...updatedUser },
        ...this.users.slice(index + 1)
      ];
      this.sortData();
      if (this.dt) {
        this.dt.reset();
        setTimeout(() => this.dt.value = [...this.users]);
      }
    }
    this.modalVisible = false;
  }

  onCompanySaved(updatedCompany: Company): void {
    const index = this.companies.findIndex(c => c.email === updatedCompany.email);
    if (index !== -1) {
      this.companies = [
        ...this.companies.slice(0, index),
        { ...updatedCompany },
        ...this.companies.slice(index + 1)
      ];
      this.sortData();
      if (this.companyTable) {
        this.companyTable.reset();
        setTimeout(() => this.companyTable.value = [...this.companies]);
      }
    }
    this.companyModalVisible = false;
  }

  shouldShowUsersTable(): boolean {
    return (
      !this.selectedUserType ||
      this.selectedUserType.name === 'User' ||
      this.selectedUserType.name === 'Admin' ||
      this.selectedUserType.name === 'Ambassador'
    );
  }

  shouldShowCompaniesTable(): boolean {
    return this.selectedUserType?.name === 'Company';
  }

  getUsers(): User[] {
    return this.users;
  }

  getCompanies(): Company[] {
    return this.companies;
  }

}