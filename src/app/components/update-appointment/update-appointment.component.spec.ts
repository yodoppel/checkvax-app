import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DataService } from 'src/app/services/data.service';

import { UpdateAppointmentComponent } from './update-appointment.component';

describe('UpdateAppointmentComponent', () => {
  let component: UpdateAppointmentComponent;
  let fixture: ComponentFixture<UpdateAppointmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentComponent ],
      imports: [IonicModule.forRoot(),
      AppRoutingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
