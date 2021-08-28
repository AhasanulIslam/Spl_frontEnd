import { ConfirmationDialogService } from './dialog/confirmation-dialog.service';
import { InventoryComponent } from './Stuff/Inventory/Inventory.component';
import { StudentComponent } from './Stuff/Student/Student.component';
import { ProductComponent } from './Stuff/Product/Product.component';
import { RoomComponent } from './Stuff/Room/Room.component';
import { TransactionComponent } from './Stuff/Transaction/Transaction.component';
import { SectionsComponent } from './sections/sections.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TechnologyStackComponent } from './technology-stack/technology-stack.component';
import { ContainerComponent } from './container/container.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NavbarComponent } from './admin-panel/navbar/navbar.component';
import { ContentComponent } from './admin-panel/content/content.component';
import { AdminAboutComponent } from './admin-panel/admin-about/admin-about.component';
import { AdminSectionsComponent } from './admin-panel/admin-sections/admin-sections.component';
import { EditItemComponent } from './admin-panel/edit-item/edit-item.component';
import { AddItemComponent } from './admin-panel/add-item/add-item.component';
import { AdminTechStackComponent } from './admin-panel/admin-tech-stack/admin-tech-stack.component';
import { EditTechComponent } from './admin-panel/admin-tech-stack/edit-tech/edit-tech.component';
import { LoginComponent } from './account/login/login.component';
import { ChangePasswordComponent } from './admin-panel/change-password/change-password.component';
import { SectionManagementComponent } from './admin-panel/section-management/section-management.component';
import { StuffComponent } from './Stuff/Stuff.component';
import { TeacherComponent } from './Teacher/Teacher.component';
import { DeleteAccountComponent } from './deleteAccount/deleteAccount.component';
import { Room_TeacherComponent } from './Teacher/Room_Teacher/Room_Teacher.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
// import { DialogComponent } from './shared/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    SectionsComponent,
    TechnologyStackComponent,
    ContainerComponent,
    AdminPanelComponent,
    NavbarComponent,
    ContentComponent,
    AdminAboutComponent,
    AdminSectionsComponent,
    EditItemComponent,
    AddItemComponent,
    AdminTechStackComponent,
    EditTechComponent,
    LoginComponent,
    ChangePasswordComponent,
    SectionManagementComponent,
      StuffComponent,
      TeacherComponent,
      DeleteAccountComponent,
      TransactionComponent,
      RoomComponent,
      ProductComponent,
      StudentComponent,
      InventoryComponent,
      Room_TeacherComponent,
      ConfirmationDialogComponent,
       ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    AppRoutingModule,
    AngularFullpageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2CarouselamosModule,
    NgbModule,
    DragDropModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(),
    HttpClientModule,
    
  ],
  providers: [ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
