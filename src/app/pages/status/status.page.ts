import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Appointment, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

   
  @Input() id: string;
  appointments = [];

  appointmentType: string;
  date: string;
  healthFacilities: string;
  vaccineType: string;
  appointment: Appointment;
 

  user$ = this.dataService.currentUserProfile$
  constructor(private route: Router, private authService:AuthService, private dataService:DataService) { 
    this.dataService.getAppointment().subscribe(res => {
      console.log(res);
      this.appointments = res;
    })
  }

  ngOnInit() {
  }

  navHome(){
    this.route.navigate(['/home']);
  }
}
