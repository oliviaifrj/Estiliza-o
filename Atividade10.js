import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  useColorScheme,
  Pressable,
  Platform,
  useWindowDimensions,
} from "react-native";

const POSTS = [
  { id: "1", source: require("./assets/marina-sena1.jpg") },
  { id: "2", source: require("./assets/marina-sena2.jpg") },
  { id: "3", source: require("./assets/marina-sena3.jpg") },
  { id: "4", source: require("./assets/marina-sena.jpg") },
];

export default function Ex10() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const { width } = useWindowDimensions();
  const [isFollowing, setIsFollowing] = useState(false);

  const colors = {
    background: isDark ? "#121212" : "#f9fafb",
    surface: isDark ? "#1e1e1e" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    textSecondary: isDark ? "#a1a1aa" : "#6b7280",
    primary: "#3b82f6",
  };

  const renderHeader = () => (
    <View style={[styles.headerContainer, { backgroundColor: colors.surface }]}>
      {/* 2. Avatar também alterado para buscar da pasta assets local (opcional) */}
      <Image
        source={require("./assets/marina-sena4.jpg")}
        style={styles.avatar}
      />
      <Text style={[styles.name, { color: colors.text }]}>marina sena</Text>
      <Text style={[styles.role, { color: colors.textSecondary }]}>
        cantora & compositora
      </Text>

      {/* Grid de Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>4</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Posts
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>3.1m</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Seguidores
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Seguindo
          </Text>
        </View>
      </View>

      {/* Botão Seguir com Pressable */}
      <Pressable
        onPress={() => setIsFollowing(!isFollowing)}
        style={({ pressed }) => [
          styles.followButton,
          isFollowing
            ? styles.buttonOutline
            : { backgroundColor: colors.primary },
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            isFollowing ? { color: colors.primary } : { color: "#fff" },
          ]}
        >
          {isFollowing ? "Seguindo" : "Seguir"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Image
            source={item.source} // 3. Usando o item.source diretamente em vez de { uri: ... }
            style={{
              width: width / 3,
              height: width / 3,
              borderWidth: 1,
              borderColor: colors.background,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
  },
  followButton: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: "#3b82f6",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
