import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export default function App() {

    const [ lastNumber, setLastNumber ] = useState();
    const [ currentNumber, setCurrentNumber ] = useState('');
    const [ iconLight, setIconLight ] = useState(true);
 
    const characters = 
    [
      "AC", "DEL", "%", "/", 
      7, 8, 9, "*", 
      4, 5, 6, "-", 
      1, 2, 3, "+", 
      "+/-", 0, ".", "="
    ];


    const styles = StyleSheet.create({
      main: {
        flex: 1
      },

      resultContainer: {
        flex: 2,
        width: "100%",
        backgroundColor: iconLight ? "#f5f5f5" : "#262525"
      },

      iconTouchable : {
        justifyContent: "flex-end",
        alignSelf: "flex-start",
        minHeight: 125,
        marginLeft: 15
      },
      
      icon: {
        color: iconLight ? "black" : "white",
        borderWidth: 1,
        width: 60,
        height: 60,
        borderColor: '#b0b0b0',
        borderRadius: 40,
        textAlign: "center",
        textAlignVertical: "center"
      },

      textContainer: {
        minHeight: 175,
        justifyContent: "flex-end"
      },
    
      textHistory: {
        fontSize: 25,
        paddingRight: 15,
        alignSelf: "flex-end",
        color: iconLight ? "black" : "white"
      },
    
      textResult: {
        fontSize: 55,
        paddingRight: 15,
        alignSelf: "flex-end",
        color: iconLight ? "black" : "white"
      },
    
      padContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      
      characters: {
        flex: 2,
        minHeight: 90,
        minWidth: 90,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5
      }, 
      
      charactersN: {
        fontSize: 22,
        color: iconLight ? 'black' : 'white'
      }
    });

    function handleButtonPress(buttonPressed){
      if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
        
        if(currentNumber.toString().indexOf("+") == -1 && currentNumber.toString().indexOf("-") == -1 && currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
          setCurrentNumber(currentNumber + " " + buttonPressed + " ");
          return;
        }else{
          const newNumberCurrent = currentNumber.toString().substring(0, currentNumber.length - 3);
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
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
        case '%':
          var change = currentNumber / 100;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
      }

     setCurrentNumber(currentNumber + buttonPressed);
    }

    function calculate(){

     const splitNumbers = currentNumber.toString().split(" ");
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
    <View style={styles.main}>
      <View 
        style={styles.resultContainer}>
        <TouchableOpacity style={styles.iconTouchable}>
          <Feather onPress={
            () => {
              iconLight === true ? 
                setIconLight(false) 
              : 
                setIconLight(true)
            }}
            style={styles.icon} 
            name={iconLight === true ? "moon" : "sun"} 
            size={30} 
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.textHistory}>
            {lastNumber}
          </Text>
          <Text style={styles.textResult}>
            {currentNumber}
          </Text>

        </View>
      </View>
    
      <View style={styles.padContainer}>
        
          {
            characters.map((char) => (
              char == "=" ?
                <TouchableOpacity
                  key={char} 
                  style={[styles.characters, {backgroundColor: iconLight? '#c8e6c1' : '#52664e'}]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.charactersN}>{char}</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity 
                  key={char} 
                  style={[styles.characters, {
                    backgroundColor: typeof(char) === 'number' ? 
                      iconLight ? 'white' : '#262525'
                      :
                      iconLight ? '#e6e6e6' : 'black'
                  
                  }]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.charactersN}>{char}</Text>
                </TouchableOpacity>

            ))
          }

      </View>
    </View>
    );
}

