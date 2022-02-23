import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';



import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';


import {DataTablesModule} from 'angular-datatables';
      
import { WheelsComponent } from './wheels.component';
import { BrowserAnimationsModule } from 
'@angular/platform-browser/animations';
import { NgxWheelModule } from 'ngx-wheel';  
  
@NgModule({ 
  imports: 
  [ BrowserModule, 
    FormsModule, 
    MatTabsModule,
    MatMenuModule,
    MatPaginatorModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule,
    EditorModule,
    QuillModule,
    NgxDatatableModule,
    ToastrModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxWheelModule], 
  declarations: [ WheelsComponent ], 
  bootstrap: [ WheelsComponent ] 
}) 
  
export class WheelsModule { }