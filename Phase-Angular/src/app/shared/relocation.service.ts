import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Relocation } from 'src/app/modele/relocation.module';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class RelocationService {
  readonly  API_URL = 'http://localhost:8000/PI/api/relocations';

<<<<<<< Updated upstream
  constructor(private httpClient: HttpClient, private userService : UserService) { }
=======
  constructor(private httpClient: HttpClient,private userService: UserService) { }
>>>>>>> Stashed changes

  getAllRelocation() {
    return this.httpClient.get(`${this.API_URL}`)
  }
  addRelocatio(relocation: Relocation): Observable<number> {
<<<<<<< Updated upstream
=======
    console.log('USE URL' , relocation)
>>>>>>> Stashed changes
    const authToken = this.userService.getAuthToken();
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    return this.httpClient.post<number>(`${this.API_URL}`, relocation,options);
  }
  getRelocationById(id :any){
    console.log('gg' , id)
    return this.httpClient.get('http://localhost:8000/PI/api/relocations/'+id)
  }

  getRelocationById1(id: any): Observable<Relocation> {
    return this.httpClient.get<Relocation>('http://localhost:8000/PI/api/relocations/'+id);
  }

  
  async getRelocationById2(id: any): Promise<Relocation> {
    const relocation = await this.httpClient.get<Relocation>('http://localhost:8000/PI/api/relocations/'+id).toPromise();
    return relocation || {} as Relocation;
  }



  EditRelocation(relocationid : any,  data:any){
    return this.httpClient.put('http://localhost:8000/PI/api/relocations/'+ relocationid,data)
  }
  deleteRelocation(idProduct : any){
    return  this.httpClient.delete(`${this.API_URL}/${idProduct}`, { responseType: 'text' });
  }
  
  

}
