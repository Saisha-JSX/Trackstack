import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Item = {
  id: string;
  title: string;
  thumbnail: string;
};

type Props = {
  data: Item[];
};

export default function CollectionGrid({ data }: Props) {
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => console.log(item.title)}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    flex: 1,
    maxWidth: '48%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});
