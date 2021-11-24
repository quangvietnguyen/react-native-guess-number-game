import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require("../assets/success.png")}
          source={{
            uri: "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultsContainer}>
        <BodyText style={styles.resultsText}>
          The phone needed{" "}
          <Text style={styles.hightlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.hightlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <Button title="NEW GAME" onPress={props.onRestart}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultsContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  resultsText: {
    textAlign: "center",
    fontSize: 20,
  },
  hightlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
