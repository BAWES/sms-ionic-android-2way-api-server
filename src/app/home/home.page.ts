import { Component, NgZone } from '@angular/core';
import { SmsService } from '../service/sms.service';
import { Events, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public textAddress;
  public textBody;

  constructor(
    public events: Events,
    private smsService: SmsService,
    private apiService: ApiService,
    private _ngZone: NgZone,
    public toastController: ToastController
  ) {
    // Start listening for sms messages
    this.smsService.startListening();

    // Start polling for SMS messages to send from Bot every few miliseconds 
    // Timer starts after 1 second then every half second
    let source = timer(1000, 500);
    const subscribe = source.subscribe(() => {
      let sub2 = this.apiService.pollForMessageToSend().subscribe((resp: any) => {
        

        if(resp.body != false){
          this._showToast(JSON.stringify(resp.body));
          
          let phone = resp.body.phone;
          let message = resp.body.message;

          this.smsService.sendSmsMessage(phone, message);
        }

        sub2.unsubscribe();
      });
    });

    // Wait for event of new sms message received
    this.events.subscribe("smsArrived", (phoneNumber, textMessage) => {
      // alert(textMessage + " from " + phoneNumber);
      this._ngZone.run(() => {
        this.textAddress = phoneNumber;
        this.textBody = textMessage;

        // Send API Request to store this text message
        this.apiService.addSmsToBackend(phoneNumber, textMessage).subscribe((resp) => {
          this._showToast(JSON.stringify(resp.body));
        });
      });
    });
  }


  async _showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  sendSmsMessage(){
    this.smsService.sendSmsMessage("+96551113111", "Testing, please reply if you received");
  }

  permission(){
    this.smsService.requestSmsSendPermission();
  }

}
