import React, { useState } from 'react';
import { View, Switch, Text } from 'react-native';
import { css } from '../assets/css/css';

export default function ControlButtons() {
  const [luzLigada, setLuzLigada] = useState(false);
  const [aguaLigada, setAguaLigada] = useState(false);
  const [ventilacaoLigada, setVentilacaoLigada] = useState(false);

  const handleLuzToggle = () => {
    const newStatus = luzLigada ? 'desligado' : 'ligado';
    setLuzLigada(!luzLigada);
    updateSensorStatus('Luz0005', newStatus);
    updateSensorStatus('Luz0006', newStatus);
  };

  const handleAguaToggle = () => {
    const newStatus = aguaLigada ? 'desligado' : 'ligado';
    setAguaLigada(!aguaLigada);
    updateSensorStatus('Umidade0009', newStatus);
    updateSensorStatus('Umidade0010', newStatus);
  };

  const handleVentilacaoToggle = () => {
    const newStatus = ventilacaoLigada ? 'desligado' : 'ligado';
    setVentilacaoLigada(!ventilacaoLigada);
    updateSensorStatus('Temperatura0001', newStatus);
    updateSensorStatus('Temperatura0002', newStatus);
  };

  const updateSensorStatus = async (nomeSensor, status) => {
    try {
      const response = await fetch('http://192.168.15.144:3000/updateSensorStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeSensor,
          status,
        }),
      });

      const data = await response.json();

      // Lide com a resposta da API conforme necessário
      console.log(data);
    } catch (error) {
      console.error('Erro ao atualizar o status do sensor:', error);
    }
  };

  return (
    <View style={css.bottomContainer}>

      <Text style={css.title}>Controle</Text>

      <View style={css.switchContainer}>
        <Text>Luz</Text>
        <Switch
          value={luzLigada}
          onValueChange={handleLuzToggle}
          style={css.switchButton}
        />
      </View>

      <View style={css.switchContainer}>
        <Text>Água</Text>
        <Switch
          value={aguaLigada}
          onValueChange={handleAguaToggle}
          style={css.switchButton}
        />
      </View>

      <View style={css.switchContainer}>
        <Text>Ventilação</Text>
        <Switch
          value={ventilacaoLigada}
          onValueChange={handleVentilacaoToggle}
          style={css.switchButton}
        />
      </View>
    </View>
  );
}