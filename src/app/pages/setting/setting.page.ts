import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  user$ = this.dataService.currentUserProfile$
  constructor(private route:Router, private authService:AuthService, private dataService:DataService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.route.navigate(['/login']);
    })
  }
}
