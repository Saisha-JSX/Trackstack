import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const sampleItems = [
  {
    id: '1',
    title: 'One Piece',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/6f/One_Piece_Logo.png',
  },
  {
    id: '2',
    title: 'Bleach',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/72/Bleach_cover_01.jpg',
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Jujutsu_kaisen_volume_1.jpg',
  },
  {
    id: '4',
    title: 'Chainsaw Man',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Chainsaw_Man_volume_1_cover.jpg',
  },
];

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Collection ID: {id}</Text>
      <FlatList
        key={2}                    // Fix: Add key equal to numColumns to avoid warning
        data={sampleItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 50 : 70,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  item: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
});
