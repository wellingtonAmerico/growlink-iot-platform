#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Redmi Note 8T";
const char* password = "77564216";
const char* serverAddress = "192.168.15.144"; // Substitua pelo IP real do seu Arduino
const String url = "/insert_data.php";
const String controlUrl = "/control.php";  // Adicione a nova URL para controle

const int sensorLuminosidadePin1 = 0;
const int sensorLuminosidadePin2 = 1;
const int sensorUmidadePin1 = 2;
const int sensorUmidadePin2 = 3;
const int sensorTemperaturaPin1 = 4;
const int sensorTemperaturaPin2 = 5;

const int pinoRelayLuz = 22;
const int pinoRelayUmidade = 24;
const int pinoRelayTemperatura = 26;

float calcularMedia(float valor1, float valor2) {
  return (float)(valor1 + valor2) / 2.0;
}

void acionarRelay(int pinoRelay, int estado) {
  digitalWrite(pinoRelay, estado);
  Serial.print("Relé no pino ");
  Serial.print(pinoRelay);
  Serial.print(" acionado: ");
  Serial.println(estado ? "ligado" : "desligado");
}

void obterEAtualizarStatus() {
  // Construa a URL para obter os status do PHP
  String statusUrlString = String("http://") + String(serverAddress) + String(controlUrl);

  Serial.print("URL de Status: ");
  Serial.println(statusUrlString);

  Serial.println("Conectando ao servidor para obter status...");
  WiFiClient wifiClient;
  HTTPClient http;
  http.begin(wifiClient, statusUrlString);

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);

        // Obtenha os status do PHP como JSON
        String jsonResponse = http.getString();
        Serial.print("JSON de Status: ");
        Serial.println(jsonResponse);

        // Parse JSON e atualizar as variáveis no Arduino Mega
        DynamicJsonDocument doc(1024);
        deserializeJson(doc, jsonResponse);

        // Obtenha os valores diretamente do JSON
        const char* luzStatus = doc["Luz0005"];
        const char* umidadeStatus = doc["Umidade0009"];
        const char* temperaturaStatus = doc["Temperatura0001"];

        // Envie os status para o Arduino Mega usando Serial
        Serial.print("Luz: ");
        Serial.println(luzStatus);
        Serial.print("Umidade: ");
        Serial.println(umidadeStatus);
        Serial.print("Temperatura: ");
        Serial.println(temperaturaStatus);

if (strcmp(luzStatus, "ligado") == 0) {
  acionarRelay(pinoRelayLuz, HIGH);
  Serial.println("Luz ligada");
} else {
  acionarRelay(pinoRelayLuz, LOW);
  Serial.println("Luz desligada");
}

if (strcmp(umidadeStatus, "ligado") == 0) {
  acionarRelay(pinoRelayUmidade, HIGH);
  Serial.println("Umidade ligada");
} else {
  acionarRelay(pinoRelayUmidade, LOW);
  Serial.println("Umidade desligada");
}

if (strcmp(temperaturaStatus, "ligado") == 0) {
  acionarRelay(pinoRelayTemperatura, HIGH);
  Serial.println("Temperatura ligada");
} else {
  acionarRelay(pinoRelayTemperatura, LOW);
  Serial.println("Temperatura desligada");
}


        // Envie os status para o Arduino Mega usando Serial
        Serial.println("Luz: " + String(luzStatus));
        Serial.println("Umidade: " + String(umidadeStatus));
        Serial.println("Temperatura: " + String(temperaturaStatus));
    } else {
        Serial.print("HTTP Request falhou. Código de erro: ");
        Serial.println(httpResponseCode);
    }

  http.end();
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println("Conectado ao WiFi");
  delay(1000);
}

void loop() {
  // Obter e atualizar os status periodicamente
  obterEAtualizarStatus();

  int valorLuminosidade1 = analogRead(sensorLuminosidadePin1);
  int valorLuminosidade2 = analogRead(sensorLuminosidadePin2);
  int valorTemperatura1 = analogRead(sensorTemperaturaPin1);
  int valorTemperatura2 = analogRead(sensorTemperaturaPin2);
  int valorUmidade1 = analogRead(sensorUmidadePin1);
  int valorUmidade2 = analogRead(sensorUmidadePin2);

    // Ajuste das leituras de temperatura
  float tensao1 = (valorTemperatura1 / 1024.0) / 5;
  float temperaturaCelsius1 = tensao1 * 100.0;

  float tensao2 = (valorTemperatura2 / 1024.0) / 5;
  float temperaturaCelsius2 = tensao2 * 100.0;

  // Ajuste das leituras de umidade
  int umidadeNormalizada1 = map(valorUmidade1, 0, 1023, 0, 100);
  int umidadeNormalizada2 = map(valorUmidade2, 0, 1023, 0, 100);

  Serial.print("Luminosidade 1: ");
  Serial.println(valorLuminosidade1);
  Serial.print("Luminosidade 2: ");
  Serial.println(valorLuminosidade2);
  Serial.print("Temperatura 1: ");
  Serial.println(temperaturaCelsius1);
  Serial.print("Temperatura 2: ");
  Serial.println(temperaturaCelsius2);
  Serial.print("Umidade 1: ");
  Serial.println(umidadeNormalizada1);
  Serial.print("Umidade 2: ");
  Serial.println(umidadeNormalizada2);

  float mediaLuminosidade = calcularMedia(valorLuminosidade1, valorLuminosidade2);
  float mediaTemperatura = calcularMedia(temperaturaCelsius1, temperaturaCelsius2);
  float mediaUmidade = calcularMedia(umidadeNormalizada1, umidadeNormalizada2);

  Serial.print("Média Luminosidade: ");
  Serial.println(mediaLuminosidade);
  Serial.print("Média Temperatura: ");
  Serial.println(mediaTemperatura);
  Serial.print("Média Umidade: ");
  Serial.println(mediaUmidade);

  // Construa a URL com os parâmetros
  String urlString = String("http://") + String(serverAddress) + String(url) + "?" +
                     "luz=" + String(mediaLuminosidade, 2) +
                     "&umidade=" + String(mediaUmidade, 2) +
                     "&temperatura=" + String(mediaTemperatura, 2);

  Serial.print("URL: ");
  Serial.println(urlString);

  Serial.println("Conectando ao servidor...");
  WiFiClient wifiClient;
  HTTPClient http;
  http.begin(wifiClient, urlString);

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("HTTP Request falhou. Código de erro: ");
    Serial.println(httpResponseCode);
  }

  http.end();
  
  // Aguardar antes de enviar os próximos dados
  delay(30000);  // Aguardar 30 segundos
}