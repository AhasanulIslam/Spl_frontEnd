import { Component, OnInit } from '@angular/core';
import {SectionsService} from '../services/sections.service';

@Component({
  selector: 'app-technology-stack',
  templateUrl: './technology-stack.component.html',
  styleUrls: ['./technology-stack.component.scss']
})
export class TechnologyStackComponent implements OnInit {

  techStack = [];
  constructor(private sectionService: SectionsService) { }

  ngOnInit() {
    this.getTechStackList();
  }

  private getTechStackList() {
    this.sectionService.getAllTechStack().subscribe(
      (res) => {
        const result = res;
        this.parse(result);
      }
    );
  }

  // tslint:disable-next-line:ban-types
  private parse(result) {
    result.forEach(
      (t) => {
        const tech = t.Tech;
        const tools = this.extractTools(t.Tools);
        this.techStack.push(
          {Name: tech, Tools: tools}
        );
      }
    );
  }

  private extractTools(tools: any) {
    const result = tools.map((tool) => tool.ToolName);
    return result.join(', ');
  }
}
