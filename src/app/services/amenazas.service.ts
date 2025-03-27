import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Amenaza } from '../pages/interfaces/amenaza';

@Injectable({
  providedIn: 'root'
})
export class AmenazasService {
  private http= inject(HttpClient);
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'Amenazas';
get():Observable<any>{
  return this.http.get(this.apiUrl);
}
add(amenaza: Amenaza):Observable<any>{
  return this.http.post(this.apiUrl, amenaza);
}
update(id:number,amenaza: Amenaza): Observable<any> {
  return this.http.put(`${this.apiUrl}/`+id, amenaza);
}
delete(id:number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/`+id);
}
}
