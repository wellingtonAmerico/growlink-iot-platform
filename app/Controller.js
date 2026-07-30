const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const { Op } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user = models.User;
let medicao = models.Medicao;
let sensor = models.Sensor;
let parametro = models.Parametro;

app.post('/Login', async (req, res) => {
  let response = await user.findOne({
    where: { user: req.body.user, senha: req.body.senha }
  });

  if (response === null) {
    res.send(JSON.stringify('error'));
  } else {
    res.send(response);
  }
});

app.get('/getUltimosValores', async (req, res) => {
  try {
    const ultimosValores = await medicao.findOne({
      order: [['id', 'DESC']],
      limit: 1,
    });

    res.status(200).json(ultimosValores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os últimos valores da tabela medicao.' });
  }
});

app.get('/getUltimosParametros', async (req, res) => {
  try {
    const ultimosParametros = await parametro.findOne({
      order: [['id', 'DESC']],
    });

    res.status(200).json(ultimosParametros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os últimos parâmetros da tabela parametro.' });
  }
});

app.post('/CadastroUsuario', async (req, res) => {
  try {
    const { nome, user: usuario, senha } = req.body;

    // Consulta o último usuário no banco de dados para obter o ID
    const ultimoUsuario = await user.findOne({
      order: [['id', 'DESC']],
    });

    let novoId = 1; // Inicializa o ID como 1 caso não haja registros no banco de dados

    if (ultimoUsuario) {
      // Se houver um último usuário, incrementa o ID
      novoId = parseInt(ultimoUsuario.id) + 1;
    }

    const id = pad(novoId.toString(), 4); // Converte o ID em string e preenche com zeros à esquerda
    const novoNome = nome; // Define o nome do usuário
    const novoUsuario = usuario; // Define o nome de usuário
    const novaSenha = senha; // Define a senha do usuário

    const novoCadastro = await user.create({
      id,
      nome: novoNome,
      user: novoUsuario,
      senha: novaSenha,
    });

    res.status(201).json(novoCadastro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
  }
});

app.post('/CadastroParametro', async (req, res) => {
  try {
    const { tempMin, tempMax, umiMin, umiMax, luzMin, luzMax, userID } = req.body;

    // Consulta o último parâmetro no banco de dados para obter o ID
    const ultimoParametro = await parametro.findOne({
      order: [['id', 'DESC']],
    });

    let novoId = 1;

    if (ultimoParametro) {
      novoId = parseInt(ultimoParametro.id) + 1;
    }

    const id = pad(novoId.toString(), 4);
    
    const novoParametro = await parametro.create({
      id,
      tempMin: parseFloat(tempMin), // Certifique-se de que os valores são números
      tempMax: parseFloat(tempMax),
      umiMin: parseFloat(umiMin),
      umiMax: parseFloat(umiMax),
      luzMin: parseFloat(luzMin),
      luzMax: parseFloat(luzMax),
      userID: userID,
    });

    res.status(201).json(novoParametro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o parâmetro.' });
  }
});

app.post('/updateSensorStatus', async (req, res) => {
  try {
    const { nomeSensor, status } = req.body;

    // Atualiza o status do sensor no banco de dados
    const updatedSensor = await sensor.update(
      { status },
      { where: { nomeSensor } }
    );

    res.status(200).json({ message: 'Status do sensor atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status do sensor.' });
  }
});

app.post('/CadastroSensor', async (req, res) => {
  try {
    const { tipoSensor, unidadeMedida } = req.body;

    // Consulta o último sensor no banco de dados para obter o ID
    const ultimoSensor = await sensor.findOne({
      order: [['id', 'DESC']],
    });

    let novoId = 1; // Inicializa o ID como 1 caso não haja registros no banco de dados

    if (ultimoSensor) {
      // Se houver um último sensor, incrementa o ID
      novoId = parseInt(ultimoSensor.id) + 1;
    }

    const id = pad(novoId.toString(), 4); // Converte o ID em string e preenche com zeros à esquerda
    const nomeSensor = `${tipoSensor}${id}`;

    const novoSensor = await sensor.create({
      id,
      nomeSensor,
      tipoSensor,
      unidadeMedida,
    });

    res.status(201).json(novoSensor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o sensor.' });
  }
});

function pad(num, size) {
  return ('0000' + num).slice(size * -1);
}

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log('Servidor Conectado');
});