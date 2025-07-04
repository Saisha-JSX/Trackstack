import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CollectionCard({ item, onPress, onMenu }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <TouchableOpacity style={styles.menuBtn} onPress={onMenu}>
        <Feather name="more-vertical" size={20} color="#666" />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.count}>{item.itemCount} items</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  menuBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  cardContent: { padding: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#111' },
  count: { fontSize: 13, color: '#666', marginTop: 4 },
});
