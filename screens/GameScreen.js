import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import NumberContainer from "../components/numberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import StartButton from "../components/StartButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListItem = (value, numberOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numberOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Dont't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <StartButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </StartButton>
        <StartButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "greater")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </StartButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  list: {
    width: "80%",
    flex: 1,
  },
  listItem: {
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
});
export default GameScreen;
