import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'app-edit-tech',
  templateUrl: './edit-tech.component.html',
  styleUrls: ['./edit-tech.component.scss']
})
export class EditTechComponent implements OnInit {
  techStack; any;
  toolName = '';
  tools: any;
  techName = '';
  id: number;

  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.extractid();
    this.getTechStackById();
  }

  onAdd() {
    this.adminService.addTool(this.id, {ToolName: this.toolName}).subscribe(
      (res) => {
        this.getTechStackById();
        this.toolName = '';
      }
    );
  }

  private extractid() {
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
      }
    );
  }

  private getTechStackById() {
    this.adminService.getTechStackById(this.id).subscribe(
      (res) => {
        this.techStack = res;
        this.techName = this.techStack.Tech;
        this.tools = this.techStack.Tools;
      }
    );
  }

  onDelete(id) {
    this.adminService.deleteTool(id).subscribe(
      (res) => {
        this.getTechStackById();
      }
    );
  }

  isValid() {
    if (this.toolName.length === 0 || !this.toolName.trim()) { return false; } else { return true; }
  }
}
