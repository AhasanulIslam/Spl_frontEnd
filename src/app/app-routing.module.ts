import { RoomComponent } from './Stuff/Room/Room.component';
import { ProductComponent } from './Stuff/Product/Product.component';
import { InventoryComponent } from './Stuff/Inventory/Inventory.component';
import { TransactionComponent } from './Stuff/Transaction/Transaction.component';
import { DeleteAccountComponent } from './deleteAccount/deleteAccount.component';
import { StuffComponent } from './Stuff/Stuff.component';
import { TeacherComponent } from './Teacher/Teacher.component';

import { ContainerComponent } from './container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AdminAboutComponent} from './admin-panel/admin-about/admin-about.component';
import {AdminSectionsComponent} from './admin-panel/admin-sections/admin-sections.component';
import {EditItemComponent} from './admin-panel/edit-item/edit-item.component';
import {AddItemComponent} from './admin-panel/add-item/add-item.component';
import {AdminTechStackComponent} from './admin-panel/admin-tech-stack/admin-tech-stack.component';
import {EditTechComponent} from './admin-panel/admin-tech-stack/edit-tech/edit-tech.component';
import {LoginComponent} from './account/login/login.component';
import {AuthGuard} from './account/auth.guard';
import {ChangePasswordComponent} from './admin-panel/change-password/change-password.component';
import {SectionManagementComponent} from './admin-panel/section-management/section-management.component';
import { StudentComponent } from './Stuff/Student/Student.component';
import { Room_TeacherComponent } from './Teacher/Room_Teacher/Room_Teacher.component';
const routes: Routes = [
  {path: '', component: ContainerComponent},
  {path: 'teacher', component: TeacherComponent,
  children: [
    {path: 'roomes', component: Room_TeacherComponent},

  ],
  canActivate: [AuthGuard]
},
  {path: '', component: StuffComponent},
  {path: 'stuff', component: StuffComponent,
  children: [
    {path: 'trns', component: TransactionComponent},
    {path: 'student', component: StudentComponent},
    {path: 'inven', component: InventoryComponent},
    {path: 'product', component: ProductComponent},
    {path: 'room', component: RoomComponent},
  ],
  canActivate: [AuthGuard]
},
  {path: 'admin', component: AdminPanelComponent ,
    children: [
      {path: '', component: AdminAboutComponent},
      {path: 'section/:id', component: AdminSectionsComponent},
      {path: 'section/:id/edit/:itemId', component: EditItemComponent},
      {path: 'section/:id/add', component: AddItemComponent},
      {path: 'tech', component: AdminTechStackComponent},
      {path: 'tech/edit/:id', component: EditTechComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'manage-sections', component: SectionManagementComponent},
      {path: 'delete', component: DeleteAccountComponent},
      {path: 'student', component: StudentComponent},
      {path: 'inven', component: InventoryComponent},
      {path: 'product', component: ProductComponent},
      {path: 'room', component: RoomComponent},
      {path: 'trns', component: TransactionComponent},


    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent}

];


@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
