import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, Text, Image } from 'react-native';
import { css } from '../assets/styles/css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';

const CadastroSensor = ( props ) => {

  const [selectedSensor, setSelectedSensor] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [nomeSensorPreview, setNomeSensorPreview] = useState('');
  const [user, setUser] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(()=>{
    async function getId()
    {
      let response=await AsyncStorage.getItem('userData');
      let json=JSON.parse(response);
      setUser(json.id);
    }
    getId();
  }, []);

  const handleCadastroSensor = async () => {
    if (selectedSensor) {
      try {
        const userId = parseInt(user);

        const response = await fetch(`${API_URL}/CadastroSensor`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipoSensor: selectedSensor,
            unidadeMedida: unidadeMedida,
            userID: userId,
          }),
        });

        const data = await response.json();
        console.log('Sensor cadastrado:', data);

        setMensagem('Sensor cadastrado com sucesso!');
        
        // Após 5 segundos, redirecione para a tela Home
        setTimeout(() => {
          props.navigation.navigate('Home');
        }, 3000);
      } catch (error) {
        console.error('Erro ao cadastrar o sensor:', error);
      }
    } else {
      console.warn('Por favor, selecione um tipo de sensor.');
    }
  };

  const updateNomeSensorPreview = (tipoSensor, id) => {
    setNomeSensorPreview(`${tipoSensor}${id}`);
  };
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, {justifyContent: 'center', marginTop: -50}]}>
      <View style={css.logo}>
        <Image source={require('../assets/img/icon.png')} />
      </View>
      
      <View style={css.midContainer}>
        <Text style={css.title}>Cadastro de Sensor</Text>
        <Picker
          selectedValue={selectedSensor}
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5}
          }
          onValueChange={(itemValue) => {
            setSelectedSensor(itemValue);
            // Defina a unidade de medida com base na seleção do sensor
            switch (itemValue) {
              case 'Temperatura':
                setUnidadeMedida('ºC');
                break;
              case 'Umidade':
                setUnidadeMedida('%');
                break;
              case 'Luz':
                setUnidadeMedida('lx');
                break;
              default:
                setUnidadeMedida('');
            }
            // Atualize a prévia do nome do sensor
            updateNomeSensorPreview(itemValue, '0001'); // Você pode ajustar o ID conforme necessário
          }}
        >
          <Picker.Item label="Selecione um tipo" value="" />
          <Picker.Item label="Temperatura" value="Temperatura" />
          <Picker.Item label="Luz" value="Luz" />
          <Picker.Item label="Umidade" value="Umidade" />
        </Picker>
        <Text style={{marginBottom: 20, paddingHorizontal: 15}}>
          <Text style={{fontWeight: 'bold'}}>Nome do sensor:</Text> {nomeSensorPreview}
        </Text>

        <Text style={[css.login__msg(), { display: mensagem ? 'flex' : 'none' }, {marginLeft: 15}]}>
          {mensagem}
        </Text>

        <TouchableOpacity style={[css.button, {marginBottom: 10}]} onPress={handleCadastroSensor}>
          <Text style={css.login__buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CadastroSensor;