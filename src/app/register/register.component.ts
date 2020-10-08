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

  constructor(private clientService: IClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.client = new Client();
  }

  public onSubmit() {
    this.clientService.saveClient(this.client).subscribe(client => {
      this.clientService.setClient(client);
      this.router.navigate(['booker']);
    });
  }

  public back() {
    alert(localStorage.getItem('client'));
  }
}

