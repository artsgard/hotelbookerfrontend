import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../shared/model/client.model';
import { IBookerService } from '../shared/service/i.booker.service';
import { IClientService } from '../shared/service/i.client.service';
import { IHotelMediaService } from '../shared/service/i.hotel-media.service';
import { IHotelService } from '../shared/service/i.hotel.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public client: Client;
  public storage = window.localStorage;

  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private hotelMediaService: IHotelMediaService, private router: Router) { }

  ngOnInit(): void { 
    this.client = new Client();
    this.storage.setItem('client', null);
  }

  public onSubmit() {
    this.storage.setItem('client', this.client.username);
    this.clientService.saveClient(this.client).subscribe(client => {
      console.log("\n\at Register saveClient " + JSON.stringify(client))
      this.client = client;
    });
    this.router.navigate(['booker']);
  }

  public back() {
    alert(localStorage.getItem('client'));
  }

}

