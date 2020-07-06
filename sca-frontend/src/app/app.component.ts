import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService]
})
export class AppComponent {

  openClose = environment.defaultOpenClose;

  receiverOpenClose = (openClose: boolean) => this.openClose = openClose;
}
