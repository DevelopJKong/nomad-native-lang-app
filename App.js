import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export default function App() {
  const position = useRef(new Animated.ValueXY({ x: -SCREEN_WIDTH / 2 - 100, y: -SCREEN_HEIGHT / 2 + 100 })).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const moveUp = () => {
    Animated.loop(Animated.sequence([topLeft, bottomLeft, bottomRight, topRight])).start();
  };

  //   const opacityValue = Y_POSITION.interpolate({
  //     inputRange: [-300, -100, 100, 300],
  //     outputRange: [1, 0.1, 0.1, 1],
  //   });
  //

  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            borderRadius,
            backgroundColor: bgColor,
            //transform: [{ rotateY: rotation }, { translateY: position.y }, { translateX: position.x }],
            transform: [...position.getTranslateTransform()],
          }}
        />
      </Pressable>
    </Container>
  );
}
