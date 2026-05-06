import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";

const AnimatedProgressBar = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ["#10b981", "#f59e0b", "#ef4444"],
  });

  return (
    <View style={styles.barBackground}>
      <Animated.View style={[styles.barFill, { width, backgroundColor }]} />
    </View>
  );
};

export default function Ex09() {
  const [value, setValue] = useState(0);

  const changeProgress = () => {
    setValue(Math.floor(Math.random() * 101));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>progresso: {value}%</Text>

      <AnimatedProgressBar progress={value} />

      <TouchableOpacity style={styles.button} onPress={changeProgress}>
        <Text style={styles.buttonText}>mudar valor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  barBackground: {
    height: 20,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
  },
  barFill: {
    height: "100%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#341539",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
