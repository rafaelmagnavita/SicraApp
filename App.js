import React from "react";
import { View, StyleSheet } from "react-native";
import Api from "./Api";

const App = () => {
  return (
    <View style={styles.container}>
      <Api />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
