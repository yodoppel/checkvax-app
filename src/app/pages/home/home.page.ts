import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user$ = this.dataService.currentUserProfile$
  constructor(private route:Router,private authService:AuthService, private dataService:DataService) { 
   console.log(this.user$);
  }

  ngOnInit() {
  }

  navUpdate(){
    this.route.navigate(['/update']);
  }

}
