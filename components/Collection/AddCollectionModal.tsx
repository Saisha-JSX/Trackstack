import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddCollectionModal({ visible, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');

  const handlePick = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert('Permission required', 'Allow photo access');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      setThumbnailUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return Alert.alert('Missing title', 'Please enter a name.');
    const newCollection = {
      id: Date.now().toString(),
      title,
      thumbnail: thumbnailUri || 'https://via.placeholder.com/150',
      itemCount: 0,
    };
    onCreate(newCollection);
    onClose();
    setTitle('');
    setThumbnailUri('');
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          <Text style={styles.header}>New Collection</Text>
          <TextInput
            placeholder="Collection Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TouchableOpacity style={styles.imageUpload} onPress={handlePick}>
            {thumbnailUri ? (
              <Image source={{ uri: thumbnailUri }} style={styles.preview} />
            ) : (
              <Text style={styles.uploadText}>Upload Cover Image</Text>
            )}
          </TouchableOpacity>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
              <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    width: '100%',
  },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  imageUpload: {
    height: 160,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  preview: { width: '100%', height: '100%', resizeMode: 'cover' },
  uploadText: { fontSize: 16, color: '#888' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancel: { fontSize: 16, color: '#888', padding: 12 },
  createBtn: {
    backgroundColor: '#007aff',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  createText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
