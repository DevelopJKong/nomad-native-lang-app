import React, { useRef, useState } from "react";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
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

export default function App() {
  const [up, setUp] = useState(false);
  const toggleUp = () => setUp((prev) => !prev);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? -300 : 300,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 1000,
    }).start(toggleUp);
  };

  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-300, -100, 100, 300],
    outputRange: [1, 0.1, 0.1, 1],
  });

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            borderRadius,
            opacity: opacityValue,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
