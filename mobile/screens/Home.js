import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { css } from '../assets/styles/css'
import CadastroParametros from './CadastroParametros'; 
import CadastroSensor from './CadastroSensor';
import ControlButtons from './ControlButtons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URL } from '../config/api';

const valoresParametros = {
  temperatura: 25, // Valor de temperatura simulado
  umidade: 60, // Valor de umidade simulado
  luminosidade: 6.5, // Valor de luminosidade simulado
};

export default function Home( props ) {

  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [luminosidade, setLuminosidade] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Função para obter os últimos valores da tabela medicao do servidor
    const getUltimosValores = async () => {
      try {
        const response = await fetch(`${API_URL}/getUltimosValores`);
        const data = await response.json();
        if (data) {
          setTemperatura(data.medicaoTemp);
          setUmidade(data.medicaoUmi);
          setLuminosidade(data.medicaoLuz);
        } else {
          setTemperatura('--');
          setUmidade('--');
          setLuminosidade('--');
         }
      } catch (error) {
        console.error(error);
      }
    };
    getUltimosValores();
  }, []);
  
  // Limites aceitáveis (5% a mais ou a menos dos valores dos sensores simulados)
  const limiteSuperior = (valor) => valor * 1.05;
  const limiteInferior = (valor) => valor * 0.95;
 
  // Função para verificar o status com base nos valores dos sensores e nos limites aceitáveis
  const verificarStatus = () => {
    const temperaturaAceitavel = temperatura >= limiteInferior(valoresParametros.temperatura) && temperatura <= limiteSuperior(valoresParametros.temperatura);
    const umidadeAceitavel = umidade >= limiteInferior(valoresParametros.umidade) && umidade <= limiteSuperior(valoresParametros.umidade);
    const luminosidadeAceitavel = luminosidade >= limiteInferior(valoresParametros.luminosidade) && luminosidade <= limiteSuperior(valoresParametros.luminosidade);

    if (temperaturaAceitavel && umidadeAceitavel && luminosidadeAceitavel) {
      setStatus(
        <Text>
          <Text style={css.title}>Condições Ideais</Text>
          {'\n\n'}As condições estão ideais para seu cultivo
        </Text>
      );
    } else {
      let parametrosComProblema = [];
      if (!temperaturaAceitavel) parametrosComProblema.push('Temperatura');
      if (!umidadeAceitavel) parametrosComProblema.push('Umidade');
      if (!luminosidadeAceitavel) parametrosComProblema.push('Luminosidade');
  
      const problemas = parametrosComProblema.join(', ');
      if (parametrosComProblema.length === 1) {
        setStatus(
          <Text>
            <Text style={css.title}>Perigo!</Text>
            {'\n\n'}{problemas} Está fora da faixa aceitável
          </Text>
        );
      } else {
        setStatus(
          <Text>
            <Text style={css.title}>Alerta</Text>
            {'\n\n'}{problemas} Está prestes a sair da faixa aceitável
          </Text>
        );
      }
    }
  };
  
  // Verificar status ao iniciar o componente ou quando os valores dos sensores mudarem
  useEffect(() => {
    verificarStatus();
  }, [temperatura, umidade, luminosidade]);
  
  return (
    <View style={css.container}>
      <View style={css.topContainer}>
        <InfoCard label="Temperatura" value={`${temperatura}°C`} />
        <InfoCard label="Umidade" value={`${umidade}%`} />
        <InfoCard label="Luminosidade" value={`${luminosidade}`} />
      </View>

      <View style={css.midContainer}>
        <Text>{status}</Text>
      </View>

      <ControlButtons />

      <View style={css.buttonContainer}>
        <TouchableOpacity style={[css.button, css.homeButton]} onPress={() => props.navigation.navigate('CadastroParametros')}>
          <Text style={[css.login__buttonText, css.homeButtonText]}>Cadastro de Parâmetros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[css.button, css.homeButton, {marginTop: 10}]} onPress={() => props.navigation.navigate('CadastroSensor')}>
          <Text style={[css.login__buttonText, css.homeButtonText]}>Cadastro de Sensor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoCard = ({ label, value }) => {
  return (
    <View style={css.cardHome}>
      <Text style={css.cardLabel}>{label}</Text>
      <Text style={css.cardValue}>{value}</Text>
    </View>
  );
};