#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include<DHT.h>

#define WIFI_SSID "flymetothemoon"
#define WIFI_PASSWORD "letmeplayamongthestars"
#define API_KEY "AIzaSyAz0_en7KW1QQu4FEvAEJ0FY-JeEqUFn6A"
#define DATABASE_URL "https://teamanuada-default-rtdb.asia-southeast1.firebasedatabase.app/"

DHT dht(D4, DHT11);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long saveDataPrevMillis =  0;
bool signupOK = false;
float temp = 0.0;
float humidity = 0.0;


void setup() {
  dht.begin();
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wifi");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  if(Firebase.signUp(&config, &auth, "", "")){
    Serial.println("SignUp OK");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

}

void loop() {
  temp = dht.readTemperature();
  humidity = dht.readHumidity();
  //Serial.print("Temp: ");
  //Serial.print(temp);
  //Serial.print(" C ");
  //Serial.print("Humidity: ");
  //Serial.print(humidity);
  //Serial.print(" % ");
  //Serial.print("\n");

  if(Firebase.ready() && signupOK && (millis() - saveDataPrevMillis > 1000 || saveDataPrevMillis == 0)){
    saveDataPrevMillis = millis();
    Firebase.RTDB.setFloat(&fbdo, "DHT11/Temperature", temp);
    Firebase.RTDB.setFloat(&fbdo, "DHT11/Humidity", humidity);
  }
}
