# android-sms-2way-api-server
Ionic Android app to send and receive SMS messages using configured API endpoints

### Base Tasks need to achieve:

* Read through device sms messages + get notified or poll for new messages
* Ability to send out sms messages
* Keep device on at all times or have app operate in background for infinite duration (always plugged into power)


### Secondary Tasks:

* Send received messages to API endpoint
* Poll API endpoint every second for an SMS message that needs to be sent, then send to another API endpoint confirming that it has been sent.


# FIX FOR PERMISSION TO SEND TEXTS:

Modify android.json from platform/android folder to have send sms permisssions as follows

```
"AndroidManifest.xml": {
        "parents": {
          "/*": [
            {
              "xml": "<uses-feature android:name=\"android.hardware.telephony\" android:required=\"false\" />",
              "count": 1
            },
            {
              "xml": "<uses-permission android:name=\"android.permission.RECEIVE_SMS\" />",
              "count": 1
            },
            {
                "xml": "<uses-permission android:name=\"android.permission.READ_SMS\" />",
                "count": 1
            },
            {
                "xml": "<uses-permission android:name=\"android.permission.SEND_SMS\" />",
                "count": 1
            }
          ],
          "/manifest": [
            {
              "xml": "<uses-feature android:name=\"android.hardware.telephony\" android:required=\"false\" />",
              "count": 1
            }
          ]
        }
      }
```