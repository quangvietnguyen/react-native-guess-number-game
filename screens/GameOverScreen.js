import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import StartButton from "../components/StartButton";

const GameOverScreen = (props) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            ...{
              width: deviceWidth * 0.7,
              height: deviceHeight * 0.7,
              borderRadius: (deviceWidth * 0.7) / 2,
              marginVertical: deviceHeight / 30,
            },
          }}
        >
          <Image
            // source={require("../assets/success.png")}
            source={{
              uri: "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.resultsContainer,
            ...{
              marginVertical: deviceHeight / 60,
            },
          }}
        >
          <BodyText
            style={{
              ...styles.resultsText,
              ...{ fontSize: deviceHeight < 400 ? 16 : 20 },
            }}
          >
            The phone needed{" "}
            <Text style={styles.hightlight}>{props.roundsNumber}</Text> rounds
            to guess the number{" "}
            <Text style={styles.hightlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <StartButton onPress={props.onRestart}>NEW GAME</StartButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultsContainer: {
    marginHorizontal: 20,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultsText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  hightlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
