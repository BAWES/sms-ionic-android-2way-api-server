import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';

declare var SMSReceive: any;

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(public events: Events) {
   }

   initialize(){
     // Start Listening for SMS messages
     SMSReceive.startWatch(function () {
       alert('smsreceive: watching started');
     }, function () {
       alert('smsreceive: failed to start watching');
     });
   }


   startListening(){
     /* Initialize incoming SMS event listener */
     document.addEventListener('onSMSArrive', (e: any) => this.onSmsArrive(e));
   }

   onSmsArrive(e: any){
     var incomingSms = e.data;

     let phoneNumber = incomingSms.address;
     let textMessage = incomingSms.body;
     
     /* Debug received SMS content (JSON) */
    //  let smsJson = JSON.stringify(incomingSms);
    //  alert("arr9ved v2" + JSON.stringify(e.data));

     this.events.publish("smsArrived", phoneNumber, textMessage);
   }
}
