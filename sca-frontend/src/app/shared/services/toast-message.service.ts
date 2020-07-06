import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private toastr: ToastrService) { }

  showMessage(typeMessage: string, titleMessage: string, message: string) {
    switch (typeMessage) {
      case 'success':
        this.toastr.success(message, titleMessage);
        break;
      case 'info':
        this.toastr.info(message, titleMessage);
        break;
      case 'warning':
        this.toastr.warning(message, titleMessage);
        break;
      case 'error':
        this.toastr.error(message, titleMessage);
        break;
      default:
        this.toastr.success(message, titleMessage);
        break;
    }
  }
}
