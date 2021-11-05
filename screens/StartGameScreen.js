import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is the start screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    color: "black",
  },
});

export default StartGameScreen;
