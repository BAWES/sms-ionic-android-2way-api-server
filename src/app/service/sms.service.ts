import { Injectable } from '@angular/core';
import { Events, ToastController } from '@ionic/angular';

declare var SMSReceive: any;
declare var sms: any;

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(public events: Events, public toastCtrl: ToastController) {
   }

   initialize(){
     // Start Listening for SMS messages
     SMSReceive.startWatch(function () {
       alert('smsreceive: watching started');
     }, function () {
       alert('smsreceive: failed to start watching');
     });
   }

   public requestSmsSendPermission(){
     var success = function (hasPermission) {
       if (!hasPermission) {
         sms.requestPermission(function () {
           alert('[OK] Permission accepted')
         }, function (error) {
           alert('[WARN] Permission not accepted')
           // Handle permission not accepted
         })
       }
     };
     var error = function (e) { alert('Something went wrong with permission request:' + e); };
     sms.hasPermission(success, error);
   }

  //  private _hasSmsSendPermission(){
  //    var success = function (hasPermission) {
  //      if (hasPermission) {
  //        sms.send(...);
  //      }
  //      else {
  //        // show a helpful message to explain why you need to require the permission to send a SMS
  //        // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
  //      }
  //    };
  //    var error = function (e) { alert('Something went wrong:' + e); };
  //    sms.hasPermission(success, error);
  //  }

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

  /** 
   * Send an sms message
   */
  sendSmsMessage(number: string, message: string) {
    //CONFIGURATION
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        // intent: 'INTENT'  // send SMS with the native android SMS messaging
        intent: '' // send SMS without opening any other app
      }
    };

    var success = function () { alert('Message sent successfully'); };
    var error = function (e) { alert('Message Failed:' + e); };
    sms.send(number, message, options, success, error);

  }
}
