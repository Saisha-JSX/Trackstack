import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import SearchBar from '../../components/Home/SearchBar';
import RecentlyAdded from '../../components/Home/RecentlyAdded';
import SectionHeader from '../../components/Home/SectionHeader';
import Categories from '../../components/Home/Categories';
import Favorites from '../../components/Home/Favorites';

const initialData = [
  {
    id: '1',
    title: 'Attack on Titan',
    category: 'Anime',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shingeki_no_Kyojin_manga_volume_1.jpg',
    favorite: true,
  },
  {
    id: '2',
    title: 'Solo Leveling',
    category: 'Manhwa',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/91/Solo_Leveling_Volume_1_cover.jpg',
    favorite: false,
  },
  {
    id: '3',
    title: 'Naruto',
    category: 'Anime',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg',
    favorite: true,
  },
  {
    id: '4',
    title: 'Tower of God',
    category: 'Manhwa',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/38/Tower_of_God_volume_1_cover.jpg',
    favorite: false,
  },
];

export default function HomeScreen() {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleFavorite = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const filteredRecentlyAdded = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const favoriteItems = data.filter((item) => item.favorite);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.header}>TrackStack</Text>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <SectionHeader title="Browse by Category" />
        <Categories selected={selectedCategory} onSelect={handleCategorySelect} />

        <SectionHeader title="Favorites" />
        <Favorites data={favoriteItems} onToggleFavorite={toggleFavorite} />

        <SectionHeader title="Recently Added" />
        {filteredRecentlyAdded.length > 0 ? (
          <RecentlyAdded data={filteredRecentlyAdded} onToggleFavorite={toggleFavorite} />
        ) : (
          <View style={styles.noResultsContainer}>
            <View style={styles.noResultsRow}>
              <Text style={styles.noResultsEmoji}>🔍</Text>
              <Text style={styles.noResultsTitle}>No Results Found</Text>
            </View>
            <Text style={styles.noResultsMessage}>
              Try a different search or clear filters.
            </Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersButton}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 50,
    color: '#111',
    marginBottom: 15,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  noResultsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  noResultsEmoji: {
    fontSize: 22,
    marginRight: 8,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  noResultsMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 280,
  },
  clearFiltersButton: {
    color: '#007aff',
    fontWeight: '600',
    marginTop: 12,
  },
});
