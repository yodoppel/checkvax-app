import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService, Registration } from 'src/app/services/data.service';
import { RegisterPageForm } from './register.page.form';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  registerForm: RegisterPageForm;
  
  

  @Input() id:string;
  registrations = [];
  department:string;
  email:string;
  ic: string;
  password:string;
  phoneNum: string;
  staffid:string;
  name:string;
  registration: Registration;

  constructor(private route:Router,private dataService: DataService, private formBuilder: FormBuilder, 
    private toastCtrl: ToastController,private authService: AuthService) {
    this.dataService.getRegistration().subscribe(res => {
      console.log(res);
      this.registrations = res;
    })
   }

  ngOnInit() {  
   this.createForm();
  }

  

  
  async Register(){
    const { email,password,name,department,ic,phoneNum,staffid } = this.registerForm.getForm().value
    this.authService.register(email,password).pipe(
      switchMap(({ user: {uid} }) => this.dataService.addRegistration({ 
        id:uid ,
        email:email, 
        name:name, 
        password: password,
        department: department,
        ic: ic,
        phoneNum: phoneNum,
        staffid:staffid   }))
      
    ).subscribe(() => {
      this.route.navigate(['/home']);
    })

    const toast = await this.toastCtrl.create({
      message: 'Registration is successful!',
      duration: 1000,
      cssClass: 'toast-custom-add',
      })
    await toast.present();
    
    this.handlerClear();
    
  }

  navLogin(){
    this.route.navigate(['/login']);
  }

  handlerClear(){
    this.department = '';
    this.name = '';
    this.email = '';
    this.ic = '';
    this.password = '';
    this.phoneNum = '';
    this.staffid = '';
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

}


