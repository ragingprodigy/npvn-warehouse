import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NpvnService } from '../../../shared/npvn.service';
import { ConfirmComponent } from '../../../shared/confirm/confirm.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  static CONFIRM = 'DetailsComponent_confirm';
  static CANCEL = 'DetailsComponent_cancel';

  device: any;
  loading = true;

  constructor(
    private remote: NpvnService, private router: Router, private route: ActivatedRoute, private modalService: NgbModal
  ) { }

  ngOnInit() {
    // Fetch Device Details from server
    this.remote.getDevice(this.route.snapshot.paramMap.get('identifier'))
    .subscribe(
      device => {
        this.loading = false;
        this.device = device;
      }, (e) => {
        this.router.navigate(['/unbundle']);
      }
    );
  }

  setStatus(category: string, status: number) {
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'confirmModal' });
    modalRef.componentInstance.confirmKey = DetailsComponent.CONFIRM;
    modalRef.componentInstance.cancelKey = DetailsComponent.CANCEL;
    modalRef.componentInstance.title = 'Confirm Action';
    modalRef.componentInstance.message = 'Are you sure you want to proceed with this?';

    modalRef.result.then(response => {
      if (response === DetailsComponent.CONFIRM) {
        this.loading = true;

        this.remote.updateUnbundlingStatus(this.device.uuid, category, status)
        .subscribe(
          (device) => {
            this.device = device;
            this.loading = false;
          }, (e) => {
            this.loading = false;
            console.log(e);
          }
        );
      }
    });
  }
}
