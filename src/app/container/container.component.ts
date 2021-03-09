import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SectionsService} from '../services/sections.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  @ViewChildren('sectionRef') sectionRef: QueryList<any>;
  config: any;
  // tslint:disable-next-line:variable-name
  fullpage_api: any;
  sec: string[];
  secLen = [];
  year = Date.now();

  constructor( private sectionService: SectionsService) {

    this.setConfig();
    // for more details on config options please visit fullPage.js docs


  }
  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  ngOnInit(): void {
    this.sectionService.getAllSectionsName().subscribe(
      (res) => {
        this.sec = res;
        this.add(res);
        this.sec.push('Technology Stack');
        this.sec.push('Contact Us');
        this.config.navigationTooltips = this.sec;
      }
    );
  }

  // arrayN() {
  //   return Array(this.secLen - 3);
  // }
  setConfig() {
    this.config = {

      // fullPage options
      licenseKey: 'YOUR LICENSE KEY HERE',
      // anchors: ['aboutPage', 'gisPage', 'm&ePage', 'webApppage', 'mobilePage', 'biPage', 'consPage', 'techStackPage', 'contactPage'],
      // menu: '#menu',
      navigation: true,
      scrollBar: true,
      scrollingSpeed: 1200,
      keyboardScrolling: true,

    };
  }

  ngAfterViewInit(): void {
    this.sectionRef.changes.subscribe(() => {
      this.fullpage_api.build();
    });
  }

  add(res) {
    for (let i = 0; i < res.length - 1; i++) {
      this.secLen.push(i);
    }
  }
}
