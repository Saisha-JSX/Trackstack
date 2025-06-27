import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const initialCollections = [
  { id: '1', title: 'Anime Favorites', thumbnail: 'https://wallpaperaccess.com/full/2213429.jpg', itemCount: 15 },
  { id: '2', title: 'Manhwa Collection', thumbnail: 'https://i.pinimg.com/originals/5d/09/8a/5d098a5e44ce041a40349039cfcfdd72.jpg', itemCount: 10 },
  { id: '3', title: 'Completed Series', thumbnail: 'https://images4.alphacoders.com/909/909217.jpg', itemCount: 8 },
  { id: '4', title: 'To Watch Next', thumbnail: 'https://cdn.wallpapersafari.com/38/21/6v36qX.jpg', itemCount: 20 },
];

export default function CollectionsScreen() {
  const router = useRouter();
  const [collections, setCollections] = useState(initialCollections);
  const [menuVisible, setMenuVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');

  const openMenu = (c) => { setSelected(c); setMenuVisible(true); };
  const closeMenu = () => { setMenuVisible(false); setSelected(null); };

  const handleDelete = () => {
    Alert.alert('Delete', `Remove "${selected.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          setCollections((prev) => prev.filter((x) => x.id !== selected.id));
          closeMenu();
        }
      }
    ]);
  };

  const pickThumbnail = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert('Permission required', 'Allow photo access');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled && result.assets.length > 0) setThumbnailUri(result.assets[0].uri);
  };

  const handleCreate = () => {
    if (!newTitle.trim()) return Alert.alert('Missing title', 'Please enter a name.');
    const newColl = { id: Date.now().toString(), title: newTitle, thumbnail: thumbnailUri || 'https://via.placeholder.com/150', itemCount: 0 };
    setCollections((prev) => [newColl, ...prev]);
    setAddModalVisible(false);
    setNewTitle('');
    setThumbnailUri('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card} activeOpacity={0.8}
      onPress={() => router.push(`/collection/${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <TouchableOpacity style={styles.menuBtn} onPress={() => openMenu(item)}>
        <Feather name="more-vertical" size={20} color="#666" />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.count}>{item.itemCount} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Collections</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setAddModalVisible(true)}>
          <Feather name="plus" size={24} color="#007aff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={collections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Menu Modal */}
      <Modal transparent visible={menuVisible} animationType="fade" onRequestClose={closeMenu}>
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption} onPress={closeMenu}>
              <Feather name="edit" size={20} color="#007aff" />
              <Text style={styles.modalOptionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalOption, { borderBottomWidth: 0 }]} onPress={handleDelete}>
              <Feather name="trash-2" size={20} color="#d9534f" />
              <Text style={[styles.modalOptionText, { color: '#d9534f' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Add Collection Modal */}
      <Modal transparent animationType="slide" visible={addModalVisible}>
        <Pressable style={styles.modalOverlay} onPress={() => setAddModalVisible(false)}>
          <View style={styles.addModal}>
            <Text style={styles.modalHeader}>New Collection</Text>
            <TextInput placeholder="Collection Title" style={styles.input} value={newTitle} onChangeText={setNewTitle} />
            <TouchableOpacity style={styles.imageUpload} onPress={pickThumbnail}>
              {thumbnailUri
                ? <Image source={{ uri: thumbnailUri }} style={styles.uploadPreview} />
                : <Text style={styles.uploadText}>Upload Cover Image</Text>
              }
            </TouchableOpacity>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#111' },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e6f0ff', alignItems: 'center', justifyContent: 'center' },
  row: { justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '48%', aspectRatio: 1, backgroundColor: '#fafafa', borderRadius: 15, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1 },
  thumbnail: { width: '100%', height: '60%' },
  menuBtn: { position: 'absolute', top: 8, right: 8, padding: 6, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.8)' },
  cardContent: { padding: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#111' },
  count: { fontSize: 14, color: '#666', marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16, width: '100%' },
  modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 25, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalOptionText: { fontSize: 16, marginLeft: 15, color: '#007aff' },
  addModal: { backgroundColor: '#fff', padding: 20, borderRadius: 16, width: '100%' },
  modalHeader: { fontSize: 20, fontWeight: '700', marginBottom: 15, textAlign: 'center', color: '#111' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 15 },
  imageUpload: { height: 150, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  uploadText: { fontSize: 16, color: '#888' },
  uploadPreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelText: { fontSize: 16, color: '#888', padding: 10 },
  createButton: { backgroundColor: '#007aff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  createText: { color: '#fff', fontWeight: '600' },
});
