import { AfterViewInit, Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-gameSetting',
  templateUrl: './gameSetting.component.html',
  styleUrls: ['./gameSetting.component.scss']
})
export class GameSettingComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  message : any;
  gameArr = [];
  game:Object;
  public srch = [];
  valid = [];
  error: number = 0;

  constructor(private modalService: NgbModal, private http: HttpClient, private router:Router) { 
    this.srch = [...this.gameArr];
  }

  public editgamesetting = {
    _id:'',
    type: '',
    content: '',
  };

  public gamesetting = {
    _id:'',
    type: '',
    content: '',
  };

  public gamevoucher = {
    _id:'',
    type: '',
    content: '',
    vtype:'',
    discount:'',
    minspend:'',
    tnc:'',
    sdate:'',
    edate:''
  };

  public editgamevoucher = {
    _id:'',
    type: '',
    content: '',
    vtype:'',
    discount:'',
    minspend:'',
    tnc:'',
    sdate:'',
    edate:''
  };




  ngOnInit() {

    $("form").attr('autocomplete', 'off');

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu : [10, 5]
    };
    this.getGameSetting();

  }
  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  open(gamesetting){
    console.log(gamesetting);
    // window.location.href = "/editSetting?id=" + gamesetting._id;
    const edsurl = "/editSetting?id=" + gamesetting._id;
    console.log(edsurl)
    this.router.navigateByUrl(edsurl)
    $('#type [value='+gamesetting.type+']').attr('selected', 'true'); 

    // //this.modalService.open(edit, {scrollable: true}).result.then((result) => {
    // });
  }

  openv(gamevoucher){
    console.log(gamevoucher);
    // window.location.href = "/editGamevch?id=" + gamevoucher._id;
    const edvurl = "/editGamevch?id=" + gamevoucher._id;
    console.log(edvurl)
    this.router.navigateByUrl(edvurl)
    $('#type [value='+gamevoucher.type+']').attr('selected', 'true'); 

    // //this.modalService.open(edit, {scrollable: true}).result.then((result) => {
    // });
  }

  openEdit(edit, gamesetting){
    this.editgamesetting = {
      _id: gamesetting._id,
      type: gamesetting.type,
      content: gamesetting.content,
    }
    console.log(this.editgamesetting)


    $('#type [value=' + gamesetting.type + ']').attr('selected', 'true');
    //$('#status [value=' + gamesetting.content + ']').attr('selected', 'true');

    this.modalService.open(edit, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }


  getGameSetting() {
    this.http.get('http://165.22.50.213:3000/getGameSetting').subscribe(res => {
      this.gameArr = res['data'];
      this.getGameVoucher()
    });
  }

  gamevArr=[]
  getGameVoucher() {
    this.http.get('http://165.22.50.213:3000/getGameVoucher').subscribe(res => {
      this.gamevArr = res['data'];
      this.dtTrigger.next(void 0);

    });
  }


  updateSetting() {
    this.error = 0;
    this.valid = this.validation();

    if (this.error === 0) {
    this.http.post('http://165.22.50.213:3000/editGameSetting', this.editgamesetting).subscribe(res => {
      console.log(res);
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gameSetting'])

  }
  }

  validation(){
    if(this.editgamesetting.type === ''){
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else{
      this.valid['type'] = ""
    }

    if(this.editgamesetting.content === ''){
      this.valid['content'] = "*Content is required!";
      this.error++;
    }
    else{
      this.valid['content'] = ""
    }

  
    return this.valid;
  }
  
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('gamesettingtable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    var wscols = [
      {wch:20},
      {wch:20},
      {wch:30},
      {wch:20},
      {wch:20},
      {wch:20},
  ];
  ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */  
    XLSX.writeFile(wb, 'gamificationReward.xlsx');

  }


}
