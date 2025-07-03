import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RecentlyAdded({ data, onToggleFavorite }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.8}>
        <View>
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
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
  },
  card: {
    width: 140,
    position: 'relative',
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 12,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 2,
    borderRadius: 4,
  },
  tag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007aff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 25,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});
