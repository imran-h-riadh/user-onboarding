import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiKey = 'AIzaSyCXP6mRBmIGhXrjb9tR99tqiqFDPRKhAN8'; // Replace with your real key

  constructor(private http: HttpClient) { }

  getAddress(lat: number, lon: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    return this.http.get(url, {
      headers: {
        'Accept-Language': 'en',
      },
    });

  }
}
