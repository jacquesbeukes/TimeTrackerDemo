import { Component, inject, output } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tts-custom-modal',
  template: `
  <div class="modal-header">
		<h4 class="modal-title">
      <ng-content select="[header]"></ng-content>
    </h4>
		<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
	</div>
	<div class="modal-body">
    <ng-content select="[content]"></ng-content>
  </div>
	<div class="modal-footer">
		<button class="btn btn-primary" type="submit" (click)="handleButton()" >
      <ng-content select="[button-label]"></ng-content>
    </button>
	</div>
  `,
})
export class CustomModal {
  activeModal = inject(NgbActiveModal);
  modalClosed = output<void>();

  handleButton() {
    this.modalClosed.emit();
    this.activeModal.close();
  }
}
