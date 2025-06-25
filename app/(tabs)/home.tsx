import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const recentlyAddedData = [
  {
    id: '1',
    title: 'Attack on Titan',
    category: 'Anime',
    image: 'https://bit.ly/3o5rD2F',
  },
  {
    id: '2',
    title: 'Solo Leveling',
    category: 'Manhwa',
    image: 'https://bit.ly/3Ynz2My',
  },
  {
    id: '3',
    title: 'Naruto',
    category: 'Anime',
    image: 'https://bit.ly/3HQGbNf',
  },
  {
    id: '4',
    title: 'Tower of God',
    category: 'Manhwa',
    image: 'https://bit.ly/3opdyTL',
  },
];

const collectionData = [
  {
    id: '1',
    title: 'Favorites',
    thumbnail: 'https://bit.ly/3Kb4GJq',
  },
  {
    id: '2',
    title: 'Watch Later',
    thumbnail: 'https://bit.ly/3IzA4LR',
  },
  {
    id: '3',
    title: 'Completed',
    thumbnail: 'https://bit.ly/3Zo6PSW',
  },
  {
    id: '4',
    title: 'To Explore',
    thumbnail: 'https://bit.ly/3IqQGuR',
  },
];

export default function Home() {
  // Render each Recently Added card
  const renderRecentlyAddedItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  // Render each Collection item
  const renderCollectionItem = ({ item }) => (
    <View style={styles.collectionItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.collectionThumbnail} />
      <Text style={styles.collectionTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>TrackStack</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search your media"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={collectionData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.collectionRow}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Recently Added heading */}
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Recently Added</Text>
            </View>

            {/* Recently Added carousel */}
            <FlatList
              data={recentlyAddedData}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentlyAddedList}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              renderItem={renderRecentlyAddedItem}
            />

            {/* Your Collection heading + Manage button */}
            <View style={[styles.sectionHeaderContainer, { marginTop: 30, marginBottom: 10 }]}>
              <Text style={styles.sectionTitle}>Your Collection</Text>
              <TouchableOpacity style={styles.manageButton}>
                <Text style={styles.manageButtonText}>Manage</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={renderCollectionItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#111',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#f1f3f6',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  recentlyAddedList: {
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
  },
  card: {
    width: 140,
  },
  cardImage: {
    width: 140,
    height: 200,
    borderRadius: 12,
  },
  categoryTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007aff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  collectionRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  collectionItem: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  collectionThumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  collectionTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  manageButton: {
    backgroundColor: '#007aff',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  manageButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
