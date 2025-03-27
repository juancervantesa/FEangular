import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http= inject(HttpClient);
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'Categoria';
get():Observable<any>{
  return this.http.get(this.apiUrl);
}
}
