import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addGame',
  templateUrl: './addGame.component.html',
  styleUrls: ['./addGame.component.scss']
})
export class AddGameComponent implements OnInit {

  message:any;
  valid = [];
  error: number = 0;
  constructor(private http: HttpClient, private router:Router) { }

  public game = {
    name: '',
    status: '',
    playtimes:'',
    sdate:'',
    edate:''
  };

  ngOnInit() {
  }
  
  sendGame(){
    console.log(this.game);
    this.error = 0;
    this.valid = this.validation();

    if (this.error === 0) {
    this.addGame(this.game);
  }
}

  addGame(game){
    console.log(this.game);
    
    this.http.post('http://165.22.50.213:3000/addGame', game).subscribe(res =>{
      console.log(res);
      this.message = res;
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/addGame'])

  });
  }

  validation() {
    if (this.game.name === '') {
      this.valid['name'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    if (this.game.playtimes === '') {
      this.valid['playtimes'] = "*Play times per user per day is required!";
      this.error++;
    }
    else if (this.game.playtimes === '0') {
      this.valid['playtimes'] = "*Play times per user per day is required!";
      this.error++;
    }
    else if (this.game.playtimes <= '0') {
      this.valid['playtimes'] = "*Invalid play times per user per day!";
      this.error++;
    }
    else {
      this.valid['playtimes'] = ""
    }


    if (this.game.sdate === '') {
      this.valid['sdate'] = "*Start date is required!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    if (this.game.edate === '') {
      this.valid['edate'] = "*End date is required!";
      this.error++;
    }
    else if (this.game.edate <= this.game.sdate) {
      this.valid['edate'] = "*Invalid end date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    if (this.game.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    return this.valid;
  }

}
