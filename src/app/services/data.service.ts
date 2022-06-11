import { Injectable } from '@angular/core';
import { collection,addDoc, collectionData, doc, docData, Firestore ,deleteDoc, updateDoc, where, collectionGroup, setDoc} from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';


import { from, Observable, of } from 'rxjs';
import { AuthService } from './auth/auth.service';

export interface Appointment{
    id?: string;
    appointmentType: string;
    date: string;
    healthFacilities: string;
    vaccineType: string;
}

export interface Registration{
    id?:string;
    department:string;
    name:string;
    email:string;
    ic: string;
    password:string;
    phoneNum: string;
    staffid:string;
}

export interface Profile{
  id?:string;
  department: string;
  phoneNum: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  get currentUserProfile$(): Observable<Registration | null>{
    return this.authService.currentUser$
    .pipe(switchMap(registration => {
      if(!registration.uid){
        return of (null);
      }
      const ref = doc(this.firestore, 'registration',registration?.uid);
      return docData(ref) as Observable<Registration>;

    }))
  } 

  constructor(private firestore: Firestore,private authService: AuthService) { }

  //Appointment CRUD//
  /////////////////////////////
  getAppointment(): Observable<Appointment[]>{
    const appointmentRef = collection(this.firestore, 'appointment');
    return collectionData(appointmentRef, {idField:'id'}) as Observable<Appointment[]>; 
  }

  getAppointmentById(id): Observable<Appointment> {
    const appointmentDocRef = doc(this.firestore, `appointment/${id}`);
    return docData(appointmentDocRef, {idField: 'id'}) as Observable<Appointment>;
  }

  addAppointment(appointment: Appointment) {
      const appointmentRef = collection(this.firestore, 'appointment');
      return addDoc(appointmentRef, appointment);


  }

  deleteAppointment(id: string){
    const appointmentDocRef = doc(this.firestore, 'appointment', id);
    return deleteDoc(appointmentDocRef);
  }

  updateAppointment(appointment: Appointment){
      const appointmentDocRef = doc(this.firestore, `appointment/${appointment.id}`);
      return updateDoc(appointmentDocRef,{
          appointmentType: appointment.appointmentType,
          date: appointment.date,
          healthFacilities: appointment.healthFacilities,
          vaccineType: appointment.vaccineType

        });
  }

  //Registration Add//
  ///////////////////////////////////////
  getRegistration(): Observable<Appointment[]>{
    const registrationRef = collection(this.firestore, 'registration');
    return collectionData(registrationRef, {idField:'id'}) as Observable<Appointment[]>; 
  }

  getRegistrationById(id): Observable<Appointment> {
    const registrationDocRef = doc(this.firestore, `registration/${id}`);
    return docData(registrationDocRef, {idField: 'id'}) as Observable<Appointment>;
  }

  addRegistration(registration: Registration){
    const registrationRef = doc(this.firestore, 'registration', registration?.id);
    return from(setDoc(registrationRef, registration));
  }
  

  updateProfile(registration: Registration, id: string){
    const registrationRef = doc(this.firestore, 'registration', id);
    return from(updateDoc(registrationRef, { ...registration }));
    
  }

  ////////////////////////////////////////////////////////////////
  
}
