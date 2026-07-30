void setup() {
  Serial.begin(115200);   // Inicia a comunicação serial com o computador
  Serial1.begin(115200);  // Inicia a comunicação serial com o ESP8266

  // Configurar pinos como saída para relés
  pinMode(22, OUTPUT);  // Pino do relé de luz
  pinMode(24, OUTPUT);  // Pino do relé de umidade
  pinMode(26, OUTPUT);  // Pino do relé de temperatura
}

void loop() {
  if (Serial1.available()) {
    char c = Serial1.read();
    Serial.print(c);
    // AQUI VOCÊ PODE ATUALIZAR AS VARIÁVEIS DE STATUS COM BASE NO CARACTERE RECEBIDO
  }

  if (Serial.available()) {
    char c = Serial.read();
    Serial1.print(c);
  }

  processarComando();  // Chama a função para acionar os relés com base nas variáveis de status

  delay(1000);
}

void processarComando() {
  // Aqui, você pode substituir as variáveis de status pelos seus próprios valores
  char luzStatus[] = "desligado";
  char umidadeStatus[] = "desligado";
  char temperaturaStatus[] = "desligado";

  if (strcmp(luzStatus, "ligado") != 0) {
    digitalWrite(22, HIGH);
  } else {
    digitalWrite(22, LOW);
  }

  if (strcmp(umidadeStatus, "ligado") != 0) {
    digitalWrite(24, HIGH);
  } else {
    digitalWrite(24, LOW);
  }

  if (strcmp(temperaturaStatus, "ligado") != 0) {
    digitalWrite(26, HIGH);
  } else {
    digitalWrite(26, LOW);
  }
}