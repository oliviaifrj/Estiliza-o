import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default function Ex03() {
  // Cria um array de 9 posições com valor inicial 'false'
  const [activeCells, setActiveCells] = useState(Array(9).fill(false));

  const toggleCell = (index) => {
    const newCells = [...activeCells];
    newCells[index] = !newCells[index]; // Inverte o estado da célula clicada
    setActiveCells(newCells);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {activeCells.map((isActive, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, isActive && styles.activeCell]}
            onPress={() => toggleCell(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  cell: {
    width: "33.33%",
    aspectRatio: 1, // Garante que a célula seja sempre quadrada
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#fff",
  },
  activeCell: {
    backgroundColor: "#341539", // Cor ao ser clicado
  },
});
