import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { css } from '../assets/styles/css';
import { API_URL } from '../config/api';

const User = ( props ) => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastroUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/CadastroUsuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          user: usuario,
          senha: senha,
        }),
      });

      if (response.status === 201) {
        // Cadastro bem-sucedido, exibe a mensagem de sucesso e redireciona após alguns segundos
        setMensagem('Cadastro bem-sucedido!');
        setTimeout(() => {
          setMensagem(''); // Limpa a mensagem após 5 segundos
          props.navigation.navigate('Login'); // Redireciona para a tela de login
        }, 3000); // Redireciona para o login após 5 segundos
      } else {
        // Se o código de status não for 201, algo deu errado no servidor
        console.error('Erro ao cadastrar o usuário:', response.status);
        setMensagem('Erro ao cadastrar o usuário. Por favor, tente novamente.'); // Exibe uma mensagem de erro na tela
      }
    } catch (error) {
      // Erro de rede ou outro erro
      console.error('Erro ao cadastrar o usuário:', error);
      setMensagem('Erro ao cadastrar o usuário. Por favor, verifique sua conexão e tente novamente.'); // Exibe uma mensagem de erro na tela
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={[css.container, {justifyContent: 'center', marginTop: -50}]}>
      <View style={css.midContainer}>
        <Text style={css.title}>Criar Usuário</Text>
        <TextInput
          style={css.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={css.input}
          placeholder="Usuário"
          value={usuario}
          onChangeText={(text) => setUsuario(text)}
        />
        <TextInput
          style={css.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        <Text style={[css.login__msg(), { display: mensagem ? 'flex' : 'none' }]}>
          {mensagem}
        </Text>

        <TouchableOpacity style={css.button} onPress={handleCadastroUsuario}>
          <Text style={css.login__buttonText}>Cadastrar</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

export default User;