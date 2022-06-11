import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss'],
})
export class StatusCardComponent implements OnInit {
  
  appointments = [];  
 
  @Input() hasTitle:boolean;
  @Input() title: string;

  @Input() facility: string;
  @Input() vaccineType: string;
  @Input() date: string;
  @Input() status: string;

  constructor(private dataService: DataService) { 
    this.dataService.getAppointment().subscribe(res => {
      console.log(res);
      this.appointments = res;
      
      
    })
  }

  ngOnInit() {}

}
