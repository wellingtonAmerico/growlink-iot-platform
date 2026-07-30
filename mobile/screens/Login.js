import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Image, View, Text, TextInput } from 'react-native';
import { css } from '../assets/styles/css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import User from './User'; 
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';

const Login = ( props ) => {

  const [display, setDisplay]=useState('none');
  const [user, setUser]=useState(null);
  const [senha, setSenha]=useState(null);
  const [login, setLogin]=useState(null);

  // Enviar dados de login para o backend
  async function sendForm() {
    let response = await fetch(`${API_URL}/Login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        senha: senha,
      }),
    });

    let json=await response.json();
    if(json === 'error'){
      setDisplay('flex');
      setTimeout(()=>{
        setDisplay('none');
      },5000);
      await AsyncStorage.clear();
    }else {
      await AsyncStorage.setItem('userData', JSON.stringify(json));
      props.navigation.navigate(Home);
    }
  }
  


  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, {justifyContent: 'center', marginTop: -50}]}>
      <View style={css.logo}>
        <Image source={require('../assets/img/icon.png')} />
      </View>

      <View style={css.midContainer}>
        <Text style={css.title}>Login</Text>
        <TextInput style={css.input} placeholder="Usuário" onChangeText={text=>setUser(text)}/>
        <TextInput style={css.input} placeholder="Senha" onChangeText={text=>setSenha(text)} secureTextEntry={true} />

        <Text style={[css.login__msg(), {display: display}]}>Usuário ou senha Inválidos!</Text>

        <TouchableOpacity style={css.button} onPress={()=>sendForm()}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{alignSelf: 'center', marginTop: 15}]}>
          <Text style={{ textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate(User)}>Criar Usuário</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;