import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Config from "./Config"; // Import the configuration object

const Api = () => {
  const [data, setData] = useState([]);
  const [idInput, setIdInput] = useState("311"); // Default ID
  const [message, setMessage] = useState("");
  const [apiUrl, setApiUrl] = useState(Config.apiUrl); // Use the apiUrl from Config

  const fetchData = () => {
    const jsonData = { id: idInput };
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(apiUrl, jsonData, { headers })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data);
          setMessage("");
        } else {
          setData([]);
          setMessage("Não há solicitações para esse código");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Ocorreu um erro ao buscar os dados");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID: {item.Id}</Text>
      <Text>Status: {item.NomeStatus}</Text>
      {/* Add other fields here */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ID"
          value={idInput.toString()}
          onChangeText={(text) => setIdInput(text)}
          keyboardType="numeric" // Set keyboardType to "numeric"
        />

        <Button title="Fetch Data" onPress={fetchData} />
      </View>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  message: {
    color: "red",
    marginBottom: 16,
  },
});

export default Api;
