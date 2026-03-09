import heavtBitmap from "@/assets/bitmaps/heavy.json";
import jumpBitmap from "@/assets/bitmaps/jump2.json";
import movingBitmap from "@/assets/bitmaps/salsicha.json";
import { useGame } from "@/hooks/gamehook";
import { router } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Easing, Image, StyleSheet } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Obstacle({ onEnd }: any) {
  const { width } = Dimensions.get("window");
  const offset = useSharedValue(0);
  const { dinoHeight } = useGame();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offset.value }],
  }));

  useEffect(() => {
    offset.value = withTiming(
      width,
      {
        duration: 3000,
        easing: Easing.linear,
      },
      onEnd,
    );
  }, []);

  useAnimatedReaction(
    () => {
      return offset.value;
    },
    (currentValue) => {
      const cactusPosition = width - Math.round(currentValue);
      const left = Math.max(100, cactusPosition);
      const right = Math.min(200, cactusPosition + 65);
      const bottom = Math.max(0, dinoHeight.value);
      const top = 65;

      if (left > right || bottom > top) {
        return;
      }

      for (let x = left; x < right; x++) {
        for (let y = bottom; y < top; y++) {
          const xDino = left - 100;
          const xCactus = x - cactusPosition;
          const yDino = 100 - (y - dinoHeight.value);
          const yCactus = 65 - y;

          const dinoBitmap = dinoHeight.value > 0 ? jumpBitmap : movingBitmap;

          if (
            xDino < 100 &&
            xDino > -1 &&
            yDino < 100 &&
            yDino > -1 &&
            xCactus < 65 &&
            xCactus > -1 &&
            yCactus < 65 &&
            yCactus > -1 &&
            dinoBitmap[xDino][yDino] &&
            heavtBitmap[xCactus][yCactus]
          ) {
            router.replace("/end");
          }
        }
      }
    },
  );

  return (
    <Animated.View style={[s.obstacle, animatedStyle]}>
      <Image
        style={s.image}
        source={require("@/assets/images/heavy.png")}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  obstacle: {
    width: 65,
    height: 65,
    position: "absolute",
    bottom: "9%",
    right: 0,
  },
});
