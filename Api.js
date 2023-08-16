import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const Api = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Configuração da URL, corpo do JSON e headers
    const apiUrl = "http://10.0.2.2:8080/api/IModSCCA/SolicitacoesWeb";
    const jsonData = { id: 311 };
    const headers = {
      "Content-Type": "application/json",
    };

    // Faz a requisição POST para a API
    axios
      .post(apiUrl, jsonData, { headers })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID: {item.Id}</Text>
      <Text>Status: {item.NomeStatus}</Text>
      {/* Adicione aqui outros campos que você deseja mostrar */}
    </View>
  );

  return (
    <View style={styles.container}>
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default Api;
