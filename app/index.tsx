import { useGame } from "@/hooks/gamehook";
import { Link } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { setScore } = useGame();

  return (
    <ImageBackground
      source={require("@/assets/images/backkk.png")}
      resizeMode="stretch"
      style={s.background}
    >
      <View style={s.container}>
        <Link href="/game" asChild replace>
          <TouchableOpacity style={s.button} onPress={() => setScore(0)}>
            <Text style={s.title}>Jogar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  button: {
    marginBottom: 30,
    borderRadius: 999,
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
