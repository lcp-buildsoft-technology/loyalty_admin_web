import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';



import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import {DataTablesModule} from 'angular-datatables';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MerchantComponent } from './merchant.component';

@NgModule({ 
    imports: 
    [  BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule,
      NgbModule,
      RouterModule,
      QuillModule,
      ReactiveFormsModule,
      EditorModule,
      FormsModule,
      ToastrModule.forRoot(),
      MatTabsModule,
      MatMenuModule,
      NgxDatatableModule,
      DataTablesModule.forRoot(),
      MatPaginatorModule,
      DataTablesModule,
  HttpClientModule], 
    declarations: [ MerchantComponent ], 
    bootstrap: [ MerchantComponent ] 
  }) 
    
  export class MerchantModule { }