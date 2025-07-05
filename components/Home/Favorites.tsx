import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Favorites({ data, onToggleFavorite }) {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="bookmark-outline" size={48} color="#ccc" />
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>Tap the bookmark to add your favorites here.</Text>
      </View>
    );
  }

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.bookmarkIcon}
            onPress={() => onToggleFavorite(item.id)}
          >
            <Ionicons
              name={item.favorite ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={item.favorite ? '#007aff' : '#888'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    marginRight: 15,
    alignItems: 'center',
    width: 100,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 8,
    marginBottom: 5,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginHorizontal: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
