import { Component, OnInit, Input } from '@angular/core';
import { SectionsService } from '../services/sections.service';
import {Section} from './section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  providers: [SectionsService]
})
export class SectionsComponent implements OnInit {
  @Input() id: number;
  name = 'STREAM';
  data: any;
  sectionData: Section;
  secDescription = '';
  secTitle = '';
  items = [{}];
  isShowable = false;
  selectedItem: any;
  selectedIndex: number;


  constructor(private sectionService: SectionsService) {
  }

  ngOnInit() {
    // console.log(this.id);
    this.fetchSectionData();
  }

  fetchItemsData() {
    this.sectionService.getItems(this.sectionData.Id).subscribe(
      (res) => {
          this.data = res;
          if (Object.keys(this.data).length > 4 ) { this.isShowable = true; }
      }
    );
  }

  fetchSectionData() {
    this.sectionService.getSections().subscribe(
      (res) => {
        this.sectionData = res[this.id];
        // console.log(this.sectionData);
        this.secTitle = this.sectionData.Title;
        this.secDescription = this.sectionData.SectionDescription;
        this.fetchItemsData();
      }
    );
  }

}
