import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../env';
import { GeoModel } from '../models/geo.model';

@Injectable()
export class GeocodingService {
  constructor(private http: HttpClient) {}

  addGeo(geoData: any): Observable<GeoModel | null> {
    const url = `${environment.apiUrl}/geo?x=${geoData.x}&y=${geoData.y}`;
    return this.http.post<GeoModel>(url, geoData).pipe(
      tap((response: GeoModel) => this.log(response)),
      catchError((error) => this.handleError(error, {} as GeoModel)),
    );
  }

  getCoordinates(address: string): Observable<any> {
    const url = `${
      environment.apiUrl
    }/geo/coordinates?address=${encodeURIComponent(address)}`;
    return this.http.get<string>(url).pipe(
      tap((response: any) => this.log(response)),
      catchError((error) => this.handleError(error, {})),
    );
  }

  getReverseGeocoding(lat: number, lng: number): Observable<any> {
    const url = `${environment.apiUrl}/geo/reverse-geocoding?lat=${lng}&lng=${lat}`;
    return this.http.get(url, { responseType: `text` }).pipe(
      tap((response: any) => this.log(response)),
      catchError((error) => this.handleError(error, {})),
    );
  }

  private log(response: GeoModel[] | GeoModel | string) {
    console.table(response);
  }
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
