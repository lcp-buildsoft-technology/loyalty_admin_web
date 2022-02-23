import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-MerchantAccountManagement',
  templateUrl: './MerchantAccountManagement.component.html',
  styleUrls: ['./MerchantAccountManagement.component.css']
})

export class MerchantAccountManagementComponent implements OnInit {
  message: any;
  merchantArr = [];
  mer: Object;


  public srch =[];
  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.srch = [...this.merchantArr];
  }

  public editMerchant = {
    name: '',
    phonenumber: '',
    email: '',
    password: '',
    video: '',
    location: '',
    bankaccount: '',
    image: ''
  }

  ngOnInit() {
    this.getMerchant();
  }
  open(content, merchant) {
    console.log(merchant);

    this.editMerchant = {
      name: merchant.name,
      phonenumber: merchant.phonenumber,
      email: merchant.email,
      password: merchant.password,
      video: merchant.video,
      location: merchant.location,
      bankaccount: merchant.bankaccount,
      image: merchant.image
    }

    this.modalService.open(content, {scrollable: true}).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openEdit(content){
    this.modalService.open(content, {scrollable: true}).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  getMerchant() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {

      console.log(res);
      this.mer = res;
      console.log(this.mer);

      this.merchantArr = res['data'];  
});
}
counter(i: number) {
  return new Array(i);
}
  uploadMerchant(merchant){


    console.log(merchant);

    this.http.post('http://165.22.50.213:3000/editmerchant', merchant).subscribe(res =>{
      console.log(res);
      this.message = res;
    });
    
    window.location.reload();
  }
  exportexcel(): void
{
  /* pass here the table id */
  let element = document.getElementById('gametable');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  var wscols = [
    {wch:20},
    {wch:20},
    {wch:30},
    {wch:20},
    {wch:20},
    {wch:20},
    {wch:20},
];
ws['!cols'] = wscols;
  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  /* save to file */  
  XLSX.writeFile(wb, 'gamificationList.xlsx');

}

}

