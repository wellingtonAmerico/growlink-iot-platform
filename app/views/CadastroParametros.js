import React, { useState } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { css } from '../assets/css/css';

const CadastroParametros = (props) => {
  const [nome, setNome] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [umiMin, setUmiMin] = useState('');
  const [umiMax, setUmiMax] = useState('');
  const [luzMin, setLuzMin] = useState('');
  const [luzMax, setLuzMax] = useState('');
  const [user, setUser] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastroParametro = async () => {
    try {
      console.log('Corpo da requisição:', JSON.stringify({
        nome: nome,
        tempMin: parseFloat(tempMin),
        tempMax: parseFloat(tempMax),
        umiMin: parseFloat(umiMin),
        umiMax: parseFloat(umiMax),
        luzMin: parseFloat(luzMin),
        luzMax: parseFloat(luzMax),
        userID: parseInt(user),
      }));

      const response = await fetch('http://192.168.15.144:3000/CadastroParametro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          tempMin: parseFloat(tempMin),
          tempMax: parseFloat(tempMax),
          umiMin: parseFloat(umiMin),
          umiMax: parseFloat(umiMax),
          luzMin: parseFloat(luzMin),
          luzMax: parseFloat(luzMax),
          userID: parseInt(user),
        }),
      });

      if (response.status === 201) {
        // Cadastro bem-sucedido, exibe a mensagem de sucesso e redireciona após alguns segundos
        setMensagem('Cadastro bem-sucedido!');
        setTimeout(() => {
          setMensagem(''); // Limpa a mensagem após 5 segundos
          props.navigation.navigate('Home'); // Redireciona para a tela de home
        }, 3000); // Redireciona para o login após 5 segundos
      } else {
        // Se o código de status não for 201, algo deu errado no servidor
        console.error('Erro ao cadastrar o parâmetro:', response.status);
        setMensagem('Erro ao cadastrar o parêmetro. Por favor, tente novamente.'); // Exibe uma mensagem de erro na tela
      }
    } catch (error) {
      console.error('Erro ao cadastrar o parâmetro:', error);
      setMensagem('Erro ao cadastrar o parâmetro. Por favor, verifique sua conexão e tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, {justifyContent: 'center', marginTop: -50}]}>
      <View style={css.logo}>
        <Image source={require('../assets/img/icon.png')} />
      </View>

      <View style={css.midContainer}>
        <Text style={css.title}>Cadastro de Parâmetros</Text>

        <View style={css.topContainer}>
          <Text style={css.rowContainer}>Nome:</Text>
          <TextInput
            style={[css.inputSmall, {width: 200}]}
            placeholder="Nome"
            onChangeText={(text) => {
              setNome(text);
            }}
          />
        </View>

        <View style={css.topContainer}>
          <View >
            <Text style={css.rowContainer}>Temperatura:</Text>
            <Text style={css.rowContainer}>Umidade:</Text>
            <Text style={css.rowContainer}>Luminosidade:</Text>
          </View>

          <View>
            <TextInput
              style={css.inputSmall}
              placeholder="Min"
              keyboardType="numeric"
              onChangeText={(text) => setTempMin(text)}
            />
            <TextInput
              style={css.inputSmall}
              placeholder="Min"
              keyboardType="numeric"
              onChangeText={(text) => setUmiMin(text)}
            />
            <TextInput
              style={css.inputSmall}
              placeholder="Min"
              keyboardType="numeric"
              onChangeText={(text) => setLuzMin(text)}
            />
          </View>

          <View>
          <TextInput
              style={css.inputSmall}
              placeholder="Max"
              keyboardType="numeric"
              onChangeText={(text) => setTempMax(text)}
            />
            <TextInput
              style={css.inputSmall}
              placeholder="Max"
              keyboardType="numeric"
              onChangeText={(text) => setUmiMax(text)}
            />
            <TextInput
              style={css.inputSmall}
              placeholder="Max"
              keyboardType="numeric"
              onChangeText={(text) => setLuzMax(text)}
            />
          </View>
        </View>

        <Text style={[css.login__msg(), { display: mensagem ? 'flex' : 'none' }]}>
          {mensagem}
        </Text>

        <TouchableOpacity style={css.button} onPress={handleCadastroParametro}>
          <Text style={css.login__buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CadastroParametros;