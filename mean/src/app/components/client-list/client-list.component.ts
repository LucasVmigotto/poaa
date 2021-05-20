import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Client } from '../../interfaces/Client'
import { ClientService } from '../../services/ClientService'

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  public clients: Array<Client> = []
  private clientSubscription: Subscription
  public isLoading: boolean = false
  public qtyClients: number = 10
  public qtyClientsPerPage: number = 2
  public qtyClientsPerPageOptions: Array<Number> = [2, 5, 10]

  constructor (public clientService: ClientService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.clientService.getClients()
    this.clientSubscription = this.clientService
      .getClientsListObservable()
      .subscribe((clients: Array<Client>) => {
        this.clients = clients
        this.isLoading = false
      })
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe()
  }

  onDelete (clientId) {
    this.clientService.removeClient(clientId)
  }

}
