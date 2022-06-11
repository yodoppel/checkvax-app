import { Component, OnInit } from '@angular/core'; 
import { ToastController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  qrData = 'https://ionicacademy.com/';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  
  user$ = this.dataService.currentUserProfile$
  constructor(private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController, private route:Router, private dataService: DataService) { }

  ngOnInit() {
  }

  scanCode(){
    this.barcodeScanner.scan().then(
      barcodeData=> {
        this.scannedCode = barcodeData.text;
        
      }
    )
    this.route.navigate(['/status']);
    
  }

  downloadQR(){
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data: ', imageData);

    let data = imageData.split(',')[1];
    
    this.base64ToGallery.base64ToGallery(data,
      { prefix: '_img', mediaScanner: true})
      .then(async res => {
          let toast = await this.toastCtrl.create({
            header: 'QR Code saved in your PhotoLibrary'
          });
          toast.present();
            },    err=> console.log('err',err)
      );
  }

}
