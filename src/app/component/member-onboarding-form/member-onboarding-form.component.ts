import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MemberTermsModalComponent } from "../member-terms-modal/member-terms-modal.component";

@Component({
  selector: 'app-member-onboarding-form',
  templateUrl: './member-onboarding-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FileUploadModule,
    ConfirmDialogModule,
    ToastModule,
    MemberTermsModalComponent
  ],
  providers: [ConfirmationService],
})
export class MemberOnboardingFormComponent implements OnChanges {
  @Input() user: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveConfirmed = new EventEmitter<any>();
  showTermsModal: boolean = false;


  form!: FormGroup;
  subscriptionOptions = [
    { label: 'Economy Class', value: 'Economy' },
    { label: 'Business Class', value: 'Business' },
    { label: 'First Class', value: 'First' },
    { label: 'Executive Class', value: 'Executive' }
  ];
  languageOptions = [
    { label: 'German', value: 'DE' },
    { label: 'English', value: 'EN' },
    { label: 'Italian', value: 'IT' }
  ];
  industryOptions = [
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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.initForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      fullName: [this.user?.fullName || '', [Validators.required, Validators.maxLength(100)]],
      emailAddress: [{ value: this.user?.emailAddress || '', disabled: true }, [Validators.required, Validators.email]],
      subscriptionModel: [this.user?.subscriptionModel || '', Validators.required],
      profileImage: [this.user?.profileImage || null],
      position: [this.user?.position || '', Validators.maxLength(50)],
      phoneNumber: [this.user?.phoneNumber || '', [Validators.required, Validators.maxLength(20)]],
      address: [this.user?.address || '', Validators.required],
      languagePreference: [this.user?.languagePreference || 'EN', Validators.required],
      company: this.fb.group({
        name: [this.user?.company?.name || '', [Validators.maxLength(100)]],
        logo: [this.user?.company?.logo || null],
        coverImage: [this.user?.company?.coverImage || null],
        description: [this.user?.company?.description || '', [Validators.maxLength(2000)]],
        industry: [this.user?.company?.industry || ''],
        logeOffers: [this.user?.company?.logeOffers || '', [Validators.maxLength(1000)]],
        tags: [this.user?.company?.tags?.join(', ') || ''],
        website: [this.user?.company?.website || '', [
          Validators.maxLength(200),
          Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
        ]],
        owner: this.fb.group({
          name: [this.user?.company?.owner?.name || '', [Validators.maxLength(50)]],
          position: [this.user?.company?.owner?.position || '', [Validators.maxLength(50)]],
          email: [this.user?.company?.owner?.email || '', [Validators.email]],
          phone: [this.user?.company?.owner?.phone || '', [Validators.maxLength(20)]]
        }),
        vatNumber: [this.user?.company?.vatNumber || '', [Validators.maxLength(50)]]
      })
    });

    this.updateSubscriptionInfo();
  }

  updateSubscriptionInfo() {
    const subscription = this.form?.get('subscriptionModel')?.value;
    let credits = 0;
    let maxBookings = 0;
    let slots = 0;

    switch (subscription) {
      case 'Economy':
        credits = 4500;
        maxBookings = 2;
        slots = 2;
        break;
      case 'Business':
        credits = 9000;
        maxBookings = 2;
        slots = 2;
        break;
      case 'First':
        credits = 18000;
        maxBookings = 4;
        slots = 2;
        break;
      case 'Executive':
        credits = 27000;
        maxBookings = 6;
        slots = 2;
        break;
    }

    return { credits, maxBookings, slots };
  }

  onProfileImageUpload(event: any) {
    const file = event.files[0];
    if (file.size > 1048576) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Profile image must be less than 1MB' });
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only JPG/PNG images allowed' });
      return;
    }
    this.form.patchValue({ profileImage: file });
  }

  onCompanyImageUpload(event: any, type: 'logo' | 'coverImage') {
    const file = event.files[0];
    if (file.size > 5242880) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Company images must be less than 5MB' });
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only JPG/PNG images allowed' });
      return;
    }

    const companyGroup = this.form.get('company') as FormGroup;
    if (companyGroup) {
      companyGroup.patchValue({ [type]: file });
    }
  }

  validateTags(tagsString: string): boolean {
    if (!tagsString.trim()) return true;

    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (tags.length > 15) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Maximum 15 tags allowed'
      });
      return false;
    }

    const invalidTag = tags.find(tag => tag.length > 30);
    if (invalidTag) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Each tag must be maximum 30 characters'
      });
      return false;
    }

    return true;
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields correctly' });
      return;
    }

    const formValue = this.form.getRawValue();

    // Validate tags before saving
    if (formValue.company?.tags && !this.validateTags(formValue.company.tags)) {
      return;
    }

    this.confirmationService.confirm({
      message: 'Are you sure you want to save these changes?',
      header: 'Confirm Save',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const updatedUser = {
          ...this.user,
          fullName: formValue.fullName,
          emailAddress: formValue.emailAddress,
          subscriptionModel: formValue.subscriptionModel,
          subscriptionInfo: this.updateSubscriptionInfo(),
          profileImage: formValue.profileImage,
          position: formValue.position,
          phoneNumber: formValue.phoneNumber,
          address: formValue.address,
          languagePreference: formValue.languagePreference,
          ...(this.user?.hasCompanyInfo && formValue.company && {
            company: {
              ...formValue.company,
              tags: formValue.company.tags ?
                formValue.company.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : []
            }
          })
        };

        console.log('Updated user:', updatedUser);
        this.saveConfirmed.emit(updatedUser);
        this.visibleChange.emit(false);
      },
      reject: () => {
        // User cancelled - do nothing
      }
    });
  }

  onHide() {
    this.visibleChange.emit(false);
  }

  get company(): FormGroup {
    return this.form.get('company') as FormGroup;
  }
  showTermsAndConditionDialog() {

    this.showTermsModal = true;
  }
  handleTermsSave(updatedHtmlTerms: string) {
    // Create a File object with HTML content
    const htmlFile = new File([updatedHtmlTerms], 'member-terms.html', {
      type: 'text/html',
    });

    this.user.condition = htmlFile;
  }
}