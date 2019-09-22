import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
    ) { }

  /**
   * Sends sms message to backend for storage and processing
   * @param phone 
   * @param message 
   * @returns {Observable<any>}
   */
  addSmsToBackend(phone: string, message: string): Observable<any> {
    const url = 'https://smsapi.yo3an.io/v1/sms';
    let params = {
      'phone': phone,
      'message': message
    };

    return this.http.post(url, params, { observe: 'response' });
  }

  /**
   * Poll for messages to send
   * @returns {Observable<any>}
   */
  pollForMessageToSend(){
    const url = 'https://smsapi.yo3an.io/v1/sms/poll';
    let params = {
    };
    return this.http.post(url, params, { observe: 'response' });
  }
}
