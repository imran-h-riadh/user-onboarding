import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-member-terms-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, EditorModule, FormsModule,],
  templateUrl: './member-terms-modal.component.html',
  styleUrl: './member-terms-modal.component.css',
})
export class MemberTermsModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<string>();

  terms: string = `
    <h3>Default Terms & Conditions</h3>
    <ul>
      <li>The member must follow platform guidelines.</li>
      <li>Credits are non-transferable and non-refundable.</li>
      <li>Violations may result in account suspension.</li>
    </ul>
  `;


  onSave() {
    this.save.emit(this.terms);
    this.visibleChange.emit(false);
  }

  onCancel() {
    this.visibleChange.emit(false);
  }
}
