import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../shared/model/client.model';
import { IClientService } from '../shared/service/i.client.service';
import { SimpleModalService } from '../shared/service/simple-modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public client: Client;
  public storage = window.localStorage;

  constructor(private clientService: IClientService,
    private modalService: SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.client = new Client();
    this.storage.setItem('client', null);
  }

  public onSubmit() {
    this.storage.setItem('client', this.client.username);
    this.clientService.saveClient(this.client).subscribe(client => {
      this.client = client;
      this.router.navigate(['booker']);
    });
  }

  public back() {
    alert(localStorage.getItem('client'));
  }
}

