# GrowLink IoT Platform

![React Native](https://img.shields.io/badge/React%20Native-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)

Aplicação mobile e backend para monitoramento e automação de estufas utilizando **React Native, Node.js, MySQL e ESP8266**.

---

## Download do APK

Link para instalação da versão Android:

https://expo.dev/accounts/wellingtonamerico/projects/GrowLink/builds/feb5308f-47b1-41ea-a17e-9468769a2fa8

---

## Screenshots

<table>
  <tr>
    <th>Login</th>
    <th>Dashboard</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/login.jpeg" width="220"/></td>
    <td><img src="docs/screenshots/dashboard.jpg" width="220"/></td>
  </tr>
  <tr>
    <th>Sensores</th>
    <th>Parâmetros</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/sensores.jpg" width="220"/></td>
    <td><img src="docs/screenshots/parametros.jpg" width="220"/></td>
  </tr>
</table>

---

## Tecnologias

### Mobile

- React Native
- Expo SDK 49
- React Navigation
- AsyncStorage

### Backend

- Node.js
- Express
- Sequelize

### Banco de dados

- MySQL (Aiven)

### Infraestrutura

- Render
- Aiven
- Expo EAS Build

### Hardware

- ESP8266
- Arduino Mega

---

## Estrutura do projeto

```text
mobile/
backend/
hardware/
docs/
```

---

## Funcionalidades

- Autenticação de usuários
- Cadastro de usuários
- Cadastro de sensores
- Cadastro de parâmetros
- Monitoramento de temperatura
- Monitoramento de umidade
- Monitoramento de luminosidade
- Controle de dispositivos
- Alertas automáticos
- Integração com banco MySQL

---

## API em produção

Backend disponível em produção:

https://growlink-iot-platform.onrender.com

Endpoint de demonstração:

https://growlink-iot-platform.onrender.com/getUltimosValores

---

## Executando localmente

### Backend

```bash
cd backend
npm install
npm start
```

### Banco de dados

```bash
npx sequelize-cli db:migrate
```

### Mobile

```bash
cd mobile
npm install
npx expo start
```

---

## Dados de demonstração

```sql
INSERT INTO Medicaos
(dataHora, medicaoLuz, medicaoUmi, medicaoTemp, userID, createdAt, updatedAt)
VALUES
(NOW(), 650, 62, 24.8, 1, NOW(), NOW());
```

---

## Próximas melhorias

- Integração MQTT
- Autenticação JWT
- Dashboard Web
- Notificações push
- Integração com hardware em tempo real

---

## Autor

Wellington Américo

LinkedIn: https://www.linkedin.com/in/wellington-am%C3%A9rico/

GitHub: https://github.com/wellingtonAmerico