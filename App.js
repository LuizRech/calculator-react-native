import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {

    const [ lastNumber, setLastNumber ] = useState();
    const [ currentNumber, setCurrentNumber ] = useState('');
 
    const characters = 
    [
      "AC", "DEL", "%", "/", 
      7, 8, 9, "*", 
      4, 5, 6, "-", 
      1, 2, 3, "+", 
      "+/-", 0, ".", "="
    ];

    function handleButtonPress(buttonPressed){
      if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
        
        if(currentNumber.toString().indexOf("+") == -1 && currentNumber.toString().indexOf("-") == -1 && currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
          setCurrentNumber(currentNumber + " " + buttonPressed + " ");
          return;
        }else{
          const newNumberCurrent = currentNumber.substring(0, currentNumber.length - 3);
          setCurrentNumber('');
          setCurrentNumber(newNumberCurrent + " " + buttonPressed + " ");
          return;
        }
      }

      switch(buttonPressed){
        case 'AC':
          setLastNumber('');
          setCurrentNumber('');
        return;
        case 'DEL':
          setCurrentNumber(currentNumber.slice(0, -1));
        return;
        case '=':
          setLastNumber(currentNumber + "=");
          calculate()
        return;
        case '+/-':
          var change = currentNumber * -1;
          setCurrentNumber(change);
        return;
      }

     setCurrentNumber(currentNumber + buttonPressed);
    }

    function calculate(){
      
     const splitNumbers = currentNumber.split(" ");
     const firstNumber = parseFloat(splitNumbers[0]);
     const secondNumber = parseFloat(splitNumbers[2]);
     const operation = splitNumbers[1];

      if(!isNaN(secondNumber)){
        switch(operation){
          case '+':
            var result = firstNumber + secondNumber;
            setCurrentNumber(result);
          return;
          case '-':
            var result = firstNumber - secondNumber;
            setCurrentNumber(result);
          return;
          case '*':
            var result = firstNumber * secondNumber;
            setCurrentNumber(result);
          return;
          case '/':
            var result = firstNumber / secondNumber;
            setCurrentNumber(result);
          return;
          default: 
            setLastNumber('');
            setCurrentNumber('');
          return;
        }
      }else{
        Alert.alert("Invalid format");
      }
    }

  return (
    <>
      <View style={styles.resultContainer}>
        <Text style={styles.textCont}>
          {lastNumber}
        </Text>
        <Text style={styles.textResult}>
          {currentNumber}
        </Text>
      </View>
    
      <View style={styles.padContainer}>
        
          {
            characters.map((char) => (
              char == "=" ?
                <TouchableOpacity
                  key={char} 
                  style={[styles.characters, {backgroundColor: '#c8e6c1'}]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.charactersN}>{char}</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity 
                  key={char} 
                  style={[styles.characters, {backgroundColor: typeof(char) === 'number' ? 'white' : '#e6e6e6'}]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.charactersN}>{char}</Text>
                </TouchableOpacity>

            ))
          }

      </View>
    </>
    );
}

const styles = StyleSheet.create({
  resultContainer: {
    minHeight: 300,
    width: "100%",
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-end"
  },

  textCont: {
    fontSize: 25,
    alignSelf: "flex-end",
    paddingRight: 15
  },

  textResult: {
    fontSize: 55,
    alignSelf: "flex-end",
    paddingRight: 15
  },

  padContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  
  characters: {
    minHeight: 90,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    borderWidth: 0.5
  }, 
  
  charactersN: {
    fontSize: 22
  }
});
