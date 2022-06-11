import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService, Profile, Registration } from 'src/app/services/data.service';
import { ProfilePageForm } from './profile.page.form';
import { UntilDestroy} from '@ngneat/until-destroy'
import { untilDestroyed} from '@ngneat/until-destroy'
import { ToastController } from '@ionic/angular';

@UntilDestroy()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  profile: ProfilePageForm;
  @Input() id:string;
  department:string;
  phoneNum: string;
  

  profileForm: FormGroup;
  user$ = this.dataService.currentUserProfile$;
  constructor(private authService : AuthService, private dataService : DataService, 
    private formBuilder: FormBuilder, private toastCtrl : ToastController) {
    console.log( this.user$);
   }

  ngOnInit() {
    this.profileForm = new ProfilePageForm(this.formBuilder).createForm();

    this.dataService.currentUserProfile$
    .pipe(untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({ ...user })
    })
    
  }

  async saveProfile(id: string){
    const profileData = this.profileForm.value;
    this.dataService.updateProfile(profileData, id);

    const toast = await this.toastCtrl.create({
      message: 'Profile has been updated!',
      duration: 1000,
      cssClass: 'toast-custom-add',
      })
    await toast.present();
  }

}
