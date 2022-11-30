import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";

export default function App() {
  const [fontsLoaded] = useFonts({
    // prettier-ignore
    "RFKrabuler": require("./assets/fonts/rfkrabuler.ttf"),
  });

  const [sound, setSound] = useState();

  async function playFail() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sounds/fail.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    left: 140,
  });

  const [currentButtonPositionIndex, setCurrentButtonPositionIndex] =
    useState(0);

  const buttonPositions = [
    {
      top: -300,
      left: -30,
    },
    {
      top: 100,
      left: 70,
    },
    {
      top: 300,
      left: -10,
    },
    {
      top: -250,
      left: 150,
    },
  ];

  const changeButtonPosition = () => {
    const topPosition = buttonPositions[currentButtonPositionIndex].top;
    const leftPosition = buttonPositions[currentButtonPositionIndex].left;
    if (currentButtonPositionIndex === buttonPositions.length - 1) {
      setCurrentButtonPositionIndex(0);
    } else {
      setCurrentButtonPositionIndex(currentButtonPositionIndex + 1);
    }
    setButtonPosition({ top: topPosition, left: leftPosition });
    playFail();
  };

  const clickedButton = {
    top: buttonPosition.top,
    left: buttonPosition.left,
  };

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Выпьем кофе?</Text>
        <View style={styles.buttonsWrap}>
          <View style={styles.answerButtonPrimary}>
            <Text style={styles.buttonTextPrimary}>Да</Text>
          </View>
          <TouchableWithoutFeedback onPress={changeButtonPosition}>
            <View style={[styles.answerButtonSecondary, clickedButton]}>
              <Text style={styles.buttonTextSecondary}>Нет</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E4E3",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 48,
    fontFamily: "RFKrabuler",
    marginBottom: 20,
    color: "#373737",
  },
  buttonsWrap: {
    width: 260,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerButtonPrimary: {
    width: 120,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC5858",
    borderRadius: 6,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "absolute",
  },
  answerButtonSecondary: {
    width: 120,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#373737",
    borderRadius: 6,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonTextPrimary: {
    fontFamily: "RFKrabuler",
    fontSize: 30,
    color: "#FFFFFF",
  },
  buttonTextSecondary: {
    fontFamily: "RFKrabuler",
    fontSize: 30,
    color: "#373737",
  },
});
