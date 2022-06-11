import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  private loading;
  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {
   
   }

  ngOnInit() {

  }
  loaderclicked(){
    this.loadingCtrl.create({})
    .then((Overlay) => {
      this.loading = Overlay;
      this.loading.present();
    });

    setTimeout(() =>{
      this.loading.dismiss();
      this.navCtrl.navigateRoot(['/login']);
    }, 2000);
  }

}
