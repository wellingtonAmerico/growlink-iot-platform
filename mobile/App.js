import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, CadastroParametros, User, CadastroSensor } from './screens';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
    
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: "",
            headerStyle:{backgroundColor: "#cfc"}
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            title: "Bem Vindo",
            headerStyle:{backgroundColor: "#cfc"},
            headerTintColor: '#333',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}
        />
        <Stack.Screen 
          name="CadastroParametros" 
          component={CadastroParametros} 
          options={{
            title: "",
            headerStyle:{backgroundColor: "#cfc"}
          }}
        /> 
        <Stack.Screen 
        name="User" 
        component={User} 
        options={{
          title: "",
          headerStyle:{backgroundColor: "#cfc"}
          }}
        />
        <Stack.Screen 
        name="CadastroSensor" 
        component={CadastroSensor} 
        options={{
          title: "",
          headerStyle:{backgroundColor: "#cfc"}
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}