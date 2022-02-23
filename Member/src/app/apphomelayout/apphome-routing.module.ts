import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { ApphomelayoutComponent } from './apphomelayout.component';
import { PinnedComponent } from './pinned/pinned.component';
import { ProfileComponent } from './profile/profile.component';
import { StyleComponent } from './style/style.component';

const routes: Routes = [
  {
    path:'',
    component: ApphomelayoutComponent,

    children:[
      {
        path:'home',
        component: HomeComponent
      },      
      {
        path:'stats',
        component: StatsComponent
      },  
      {
        path:'pinned',
        component: PinnedComponent
      },    
      {
        path:'style',
        component: StyleComponent
      },   
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'pagenotfound',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule]
})
export class ApphomelayoutRoutingModule { }
