import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Appointment, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss'],
})
export class UpdateAppointmentComponent implements OnInit {

  appointments = [];  
 
  @Input() hasTitle:boolean;
  @Input() title: string;

  @Input() appointmentType: string;
  @Input() status: string;
  @Input() id: string;
  
  appointment: Appointment;

  constructor(private route:Router,private dataService: DataService, private toastCtrl: ToastController,
     private modalCtrl: ModalController) { 
    this.dataService.getAppointment().subscribe(res => {
      console.log(res);
      this.appointments = res;
      
      
    })
  }

  ngOnInit() {
  }

  async deleteApp(id){
    
    await this.dataService.deleteAppointment(this.id);
    const toast = await this.toastCtrl.create({
      message: 'Appointment has been deleted',
      duration: 1000,
      cssClass: 'toast-custom-delete'
    });
    await toast.present();
  }

 
  navScan(){
    this.route.navigate(['/scan']);
  }

}
