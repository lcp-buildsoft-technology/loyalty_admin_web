import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatMenuModule } from '@angular/material/menu';
import { OthersettingComponent } from './othersetting.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';



import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';


import {DataTablesModule} from 'angular-datatables';

import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from 
'@angular/platform-browser/animations';
  
  
@NgModule({ 
  imports: 
  [ BrowserModule, 
    FormsModule, 
    MatTabsModule,
    MatMenuModule,
    HttpClientModule,
    RouterModule,
    ToastrModule,
    NgbModule,
    EditorModule,
    QuillModule,
    NgxDatatableModule,
    MatPaginatorModule,
    DataTablesModule,
    BrowserAnimationsModule], 
  declarations: [ OthersettingComponent ], 
  bootstrap: [ OthersettingComponent ] 
}) 
  
export class OthersettingModule { }