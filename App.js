import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {

    const characters = 
    [
      "AC", "DEL", "%", "/", 
      7, 8, 9, "*", 
      4, 5, 6, "-", 
      1, 2, 3, "+", 
      "+/-", 0, ".", "="
    ];

  return (
    <>
      <View style={styles.resultContainer}>
        <Text style={styles.textCont}>
          1 + 1 =
        </Text>
        <Text style={styles.textResult}>
          2
        </Text>
      </View>
    
      <View style={styles.padContainer}>
        
          {
            characters.map((char) => (
              char == "=" ?
               <TouchableOpacity key={char} style={[styles.characters, {backgroundColor: '#c8e6c1'}]}>
                  <Text style={styles.charactersN}>{char}</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity key={char} style={[styles.characters, {backgroundColor: typeof(char) === 'number' ? 'white' : '#e6e6e6'}]}>
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
