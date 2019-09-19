import { Component } from '@angular/core';
import { SmsService } from '../service/sms.service';
import { Events } from '@ionic/angular';

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
    private smsService: SmsService
  ) {
    // Start listening for sms messages
    this.smsService.startListening();

    // Wait for event of new sms message received
    this.events.subscribe("smsArrived", (phoneNumber, textMessage) => {
      alert(textMessage + " from " + phoneNumber);
      this.textAddress = phoneNumber;
      this.textBody = textMessage;
    });
  }

}
