import { Component, NgZone } from '@angular/core';
import { SmsService } from '../service/sms.service';
import { Events, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

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
