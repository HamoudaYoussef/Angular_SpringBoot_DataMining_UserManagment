import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import axios from 'axios';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders,HttpClient } from '@angular/common/http';
import { Delivery } from '../modele/delivery/delivery.module';
<<<<<<< Updated upstream
=======
import { UserService } from './user.service';
import { Tax } from '../modele/delivery/tax.module';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  readonly  API_URL = 'http://localhost:8000/PI/api/deliverys';

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getAllDelivery() {
    return this.httpClient.get(`http://localhost:8000/PI/api/deliverys`)
  }
<<<<<<< Updated upstream
  addDelivery(data : Delivery , idOffre : any ,idUser : any){
=======
  addDelivery(data : any , idOffre : any ){
>>>>>>> Stashed changes
    console.log('USE URL' , data)
    return this.httpClient.post('http://localhost:8000/PI/api/deliverys/test/'+idUser+'/'+idOffre , data)
  }
  getDeliveryById(id :any){
    console.log('gg' , id)
    return this.httpClient.get('http://localhost:8000/PI/api/deliverys/'+id)
  }

  gettaxbyid(id: any): Observable<Tax> {
    const url = `http://localhost:8000/PI/api/taxs/${id}`;
    return this.httpClient.get<Tax>(url).pipe();
  }
  
  EditDelivery(deliveryid : any,  data:any){
    return this.httpClient.put('http://localhost:8000/PI/api/deliverys/'+ deliveryid,data)
  }
  DelateDelivery(deliveryid : number){
    return  this.httpClient.delete(`${this.API_URL}/${deliveryid}`, { responseType: 'text' })
  }
  getBestDelivery() : Observable<string> {
    const url = `${this.API_URL}/BestDelivery`;
    return this.httpClient.get<string>(url);

  }
  gettaxbyid(id: any): Observable<Tax> {
    const url = `http://localhost:8000/PI/api/taxs/${id}`;
    return this.httpClient.get<Tax>(url).pipe();
  }
  
}
