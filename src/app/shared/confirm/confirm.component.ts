import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() title;
  @Input() message;
  @Input() closeLabel;
  @Input() affirmLabel;
  @Input() confirmKey = 'confirm';
  @Input() cancelKey = 'cancel';

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClose() {
    this.activeModal.close(this.cancelKey);
  }

  affirm() {
    this.activeModal.close(this.confirmKey);
  }
}
