import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import SearchBar from '../../components/ui/SearchBar';
import RecentlyAdded from '../../components/ui/RecentlyAdded';
import CollectionGrid from '../../components/ui/CollectionGrid';
import SectionHeader from '../../components/ui/SectionHeader';

const recentlyAddedData = [
  { id: '1', title: 'Attack on Titan', category: 'Anime', image: 'https://bit.ly/3o5rD2F' },
  { id: '2', title: 'Solo Leveling', category: 'Manhwa', image: 'https://bit.ly/3Ynz2My' },
  { id: '3', title: 'Naruto', category: 'Anime', image: 'https://bit.ly/3HQGbNf' },
  { id: '4', title: 'Tower of God', category: 'Manhwa', image: 'https://bit.ly/3opdyTL' },
];

const collectionData = [
  { id: '1', title: 'Favorites', thumbnail: 'https://bit.ly/3Kb4GJq' },
  { id: '2', title: 'Watch Later', thumbnail: 'https://bit.ly/3IzA4LR' },
  { id: '3', title: 'Completed', thumbnail: 'https://bit.ly/3Zo6PSW' },
  { id: '4', title: 'To Explore', thumbnail: 'https://bit.ly/3IqQGuR' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleManagePress = () => {
    Alert.alert('Manage Collections', 'This feature is under development.');
  };

  const filteredRecentlyAdded = recentlyAddedData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCollections = collectionData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.header}>TrackStack</Text>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <SectionHeader title="Recently Added" />
      {filteredRecentlyAdded.length > 0 ? (
        <RecentlyAdded data={filteredRecentlyAdded} />
      ) : (
        <Text style={styles.noResultsText}>No recently added items match your search.</Text>
      )}

      <SectionHeader
        title="Your Collection"
        showAction
        actionLabel="Manage"
        onPress={handleManagePress}
        style={{ marginTop: 30, marginBottom: 10 }}
      />
      {filteredCollections.length > 0 ? (
        <CollectionGrid data={filteredCollections} />
      ) : (
        <Text style={styles.noResultsText}>No collections match your search.</Text>
      )}
    </ScrollView>
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
  noResultsText: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
