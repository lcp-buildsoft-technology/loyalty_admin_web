import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatMenuModule } from '@angular/material/menu';
import { DataTablesModule } from 'angular-datatables';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CookieModule } from 'ngx-cookie';
import {NgxWebstorageModule} from 'ngx-webstorage';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    EditorModule,
    FormsModule,
    ToastrModule.forRoot(),
    CookieModule.forRoot(),
    MatMenuModule,
    NgxDatatableModule,
    DataTablesModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    MatPaginatorModule,
    DataTablesModule,
    HttpClientModule

  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }

