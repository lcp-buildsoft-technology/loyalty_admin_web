import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';
import {DataTablesModule} from 'angular-datatables';
import { AdminUserComponent } from './adminUser.component';
import { BrowserAnimationsModule } from 
'@angular/platform-browser/animations';
  
  
@NgModule({ 
  imports: 
  [ BrowserModule, 
    FormsModule, 
    MatTabsModule,
    MatMenuModule,
    RouterModule,
    QuillModule,
    NgxDatatableModule,
    EditorModule,
    DataTablesModule,
    ToastrModule,
    NgbModule,
    MatPaginatorModule,
    HttpClientModule,
    BrowserAnimationsModule], 
  declarations: [ AdminUserComponent ], 
  bootstrap: [ AdminUserComponent ] 
}) 
  
export class AdminUserModule { }