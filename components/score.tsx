import { useGame } from "@/hooks/gamehook";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Score() {
  const { score, setScore } = useGame();

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((oldState: any) => oldState + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.txt}>{score}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
