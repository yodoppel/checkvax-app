import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Appointment, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;
  
  @Input() id: string;
  appointments = [];

  appointmentType: string;
  date: string;
  healthFacilities: string;
  vaccineType: string;
  appointment: Appointment;
 

  
  accordianGroup: any;

  user$ = this.dataService.currentUserProfile$

  constructor(private route:Router,private dataService: DataService,private authService:AuthService, private toastCtrl: ToastController) { 
      this.dataService.getAppointment().subscribe(res => {
        console.log(res);
        this.appointments = res;
      })
  }

  ngOnInit() {
  
  }
  

  async btnAddClicked(){
    this.dataService.addAppointment({
      appointmentType: this.appointmentType,
      date: this.date,  
      healthFacilities: this.healthFacilities, 
      vaccineType: this.vaccineType}); 
    const toast = await this.toastCtrl.create({
      message: 'Appointment has been added',
      duration: 1000,
      cssClass: 'toast-custom-add'
    });
    await toast.present();
    this.handlerClear();
    this.closeAccordion();
  }

  async openAppointment(appointment){
   
  }

  closeAccordion() {
    this.accordionGroup.value = '';
  }  


  navScan(){
    this.route.navigate(['/scan']);
  }
  handlerClear(){
    this.appointmentType = '';
    this.date = '';
    this.healthFacilities = '';
    this.vaccineType = '';
  }

}
