import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";

const FeedScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10"
    );
    const result = await response.json();
    setData((prev) => [...prev, ...result]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.download_url }} style={styles.image} />
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={fetchData}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 10 },
});

export default FeedScreen;
