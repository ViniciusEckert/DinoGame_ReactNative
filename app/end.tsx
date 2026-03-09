import { useGame } from "@/hooks/gamehook";
import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function End() {
  const { score } = useGame();

  return (
    <View style={s.container}>
      <ImageBackground
        style={s.container}
        source={require("@/assets/images/background.png")}
      />

      <View style={s.obstacle}>
        <Image
          source={require("@/assets/images/taunt.gif")}
          style={s.image}
          resizeMode="contain"
        />
      </View>

      <View style={s.dino}>
        <Image
          source={require("@/assets/images/salsichaDown.png")}
          style={s.image}
          resizeMode="contain"
        />
      </View>

      <View style={s.textContainer}>
        <Text style={s.text}>Fim de jogo</Text>

        <Text style={s.text}>{score}</Text>
        <Link href="/" asChild>
          <Text style={s.button}>Voltar</Text>
        </Link>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  dino: {
    width: 100,
    height: 200,
    position: "absolute",
    zIndex: 10,
    bottom: "-13%",
    left: 100,
  },
  obstacle: {
    width: 200,
    height: 200,
    position: "absolute",
    bottom: "-1%",
    left: 140,
  },
  textContainer: {
    position: "absolute",
    top: "30%",
    left: "40%",
    transform: [{ translateX: "50%" }, { translateY: "50%" }],
    gap: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    width: "auto",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    width: "auto",
    backgroundColor: "#000000",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 999,
    color: "#ffffff",
  },
});
