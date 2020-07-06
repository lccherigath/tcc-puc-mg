import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  openClose = environment.defaultOpenClose;
  @Output() openCloseEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sidebarOpenClose = () => this.openClose = !this.openClose;

  openCloseEmmit = () => {
    this.sidebarOpenClose();
    this.openCloseEmitter.emit(this.openClose);
  }

}
