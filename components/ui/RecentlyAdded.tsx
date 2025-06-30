import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Item = {
  id: string;
  title: string;
  category: string;
  image: string;
};

type Props = {
  data: Item[];
};

export default function RecentlyAdded({ data }: Props) {
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log(item.title)}>
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
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
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 12,
  },
  tag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007aff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
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
