import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CollectionCard from '../../components/Collection/CollectionCard';
import AddCollectionModal from '../../components/Collection/AddCollectionModal';
import CollectionMenuModal from '../../components/Collection/CollectionMenuModal';

const initialCollections = [
  {
    id: '1',
    title: 'Anime Favorites',
    thumbnail: 'https://wallpaperaccess.com/full/2213429.jpg',
    itemCount: 15,
  },
  {
    id: '2',
    title: 'Manhwa Collection',
    thumbnail: 'https://i.pinimg.com/originals/5d/09/8a/5d098a5e44ce041a40349039cfcfdd72.jpg',
    itemCount: 10,
  },
  {
    id: '3',
    title: 'Completed Series',
    thumbnail: 'https://images4.alphacoders.com/909/909217.jpg',
    itemCount: 8,
  },
  {
    id: '4',
    title: 'To Watch Next',
    thumbnail: 'https://cdn.wallpapersafari.com/38/21/6v36qX.jpg',
    itemCount: 20,
  },
];

export default function CollectionsScreen() {
  const router = useRouter();

  const [collections, setCollections] = useState(initialCollections);
  const [menuVisible, setMenuVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDelete = () => {
    Alert.alert('Delete', `Remove "${selected.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setCollections((prev) => prev.filter((x) => x.id !== selected.id));
          closeMenu();
        },
      },
    ]);
  };

  const openMenu = (collection) => {
    setSelected(collection);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelected(null);
  };

  const handleAdd = (newCollection) => {
    setCollections((prev) => [newCollection, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Collections</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setAddModalVisible(true)}>
          <Feather name="plus" size={24} color="#007aff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollectionCard item={item} onPress={() => router.push(`/collection/${item.id}`)} onMenu={() => openMenu(item)} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <CollectionMenuModal
        visible={menuVisible}
        onClose={closeMenu}
        onDelete={handleDelete}
      />

      <AddCollectionModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onCreate={handleAdd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  header: { fontSize: 28, fontWeight: 'bold', color: '#111' },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
