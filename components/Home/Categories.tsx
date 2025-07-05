// components/Home/Categories.js
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const categories = [
  {
    id: 'anime',
    title: 'Anime',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Anime_Girl.png',
  },
  {
    id: 'manhwa',
    title: 'Manhwa',
    image: 'https://upload.wikimedia.org/wikipedia/en/1/18/Solo_Leveling_web_novel_volume_1_cover.jpg',
  },
  {
    id: 'movies',
    title: 'Movies',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Interstellar_film_poster.jpg',
  },
  {
    id: 'music',
    title: 'Music',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/74/Taylor_Swift_-_1989.png',
  },
];

export default function Categories({ onSelect }) {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onSelect?.(item.id)}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
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
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
});
