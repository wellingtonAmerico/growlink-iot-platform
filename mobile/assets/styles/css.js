import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cfc',
      alignItems: 'center',
      height: '100%',
    },
    topContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
    },
    rowContainer: {
      height: 40,
      marginBottom: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    midContainer: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      margin: 20,
      textAlign: 'center',
    },
    bottomContainer: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      margin: 10,
    },
    cardHome: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 16,
      paddingVertical: 18,
      paddingHorizontal: 14,
      margin: 8,
      minWidth: 100,
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    cardLabel: {
      fontWeight: '600',
      fontSize: 13,
      color: '#666',
      marginBottom: 6,
    },

    cardValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#222',
    },
    cardCadastro: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    inputSmall: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    switchContainer: {
      flexDirection: 'row', // Alinha os botões de alternância na horizontal
      alignItems: 'center', // Alinha os itens verticalmente no centro
      justifyContent: 'space-between', // Distribui o espaço entre os botões de alternância
      marginVertical: 10, // Espaçamento vertical entre os botões e outros elementos
    },

    switchButton: {
      trackColor: { false: '#767577', true: '#009859' },
    },
    buttonContainer: {
      marginTop: 30,
    },
    login__msg:(text='none')=> ({
      color: 'red',
      marginTop: -15,
      marginBottom: 20,
      display: text,
    }),
    button: {
      padding: 15,
      backgroundColor: '#714634',
      alignSelf: 'center',
      borderRadius: 5,
    },
    login__buttonText: {
      color: 'white',
    },
    logo: {
      margin: 20,
    },
    homeButton: {
      width: 200,
      padding: 15,
      backgroundColor: '#714634',
      alignSelf: 'center',
      borderRadius: 5,
    },
    homeButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });

  export {css};