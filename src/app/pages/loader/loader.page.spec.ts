import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { LoaderPage } from './loader.page';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    
    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should go to login page after load', () => {

  //   // spyOn(router, 'nagivate'); //my test have to watch the navigate function of the router object
  //   // component.ngOnInit(); //everytime loader page opened , it will execute ngOnInit
  //   expect(component).toBeTruthy;

  // });
});
