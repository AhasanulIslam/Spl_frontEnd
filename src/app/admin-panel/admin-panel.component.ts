import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  providers: [AdminService]
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
