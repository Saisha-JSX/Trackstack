import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

export default function AddItemScreen() {
  const [collection, setCollection] = useState('');
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [progress, setProgress] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'We need permission to access your photos.');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!pickerResult.cancelled) {
      setCoverImage(pickerResult.uri);
    }
  };

  const handleSave = () => {
    if (!collection || !title) {
      Alert.alert('Missing info', 'Please select a collection and enter a title.');
      return;
    }
    Alert.alert('Item Saved', `Title: ${title}\nCollection: ${collection}\nStatus: ${status}`);
    // Reset fields if needed here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Add New Item</Text>

        {/* Collection Picker */}
        <Text style={styles.label}>Collection</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={collection}
            onValueChange={(itemValue) => setCollection(itemValue)}
            style={styles.picker}
            prompt="Select a collection"
          >
            <Picker.Item label="Select a collection" value="" />
            <Picker.Item label="Anime" value="anime" />
            <Picker.Item label="Manhwa" value="manhwa" />
            <Picker.Item label="Movies" value="movies" />
            <Picker.Item label="Books" value="books" />
          </Picker>
        </View>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          returnKeyType="done"
        />

        {/* Cover Image */}
        <Text style={styles.label}>Cover Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.7}>
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Feather name="upload" size={28} color="#007aff" />
              <Text style={styles.imagePlaceholderText}>Upload Image or drag and drop</Text>
              <Text style={styles.imageSubText}>PNG, JPG up to 10MB</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Progress */}
        <Text style={styles.label}>Progress (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Episode 5 of 12, Page 150 of 300"
          value={progress}
          onChangeText={setProgress}
          returnKeyType="done"
        />

        {/* Status */}
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.picker}
            prompt="Select status"
          >
            <Picker.Item label="Select status" value="" />
            <Picker.Item label="Watching / Reading" value="watching" />
            <Picker.Item label="Completed" value="completed" />
            <Picker.Item label="On Hold" value="onhold" />
            <Picker.Item label="Dropped" value="dropped" />
            <Picker.Item label="Plan to Watch / Read" value="plan" />
          </Picker>
        </View>

        {/* Notes */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Add your thoughts, status, or notes here..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          returnKeyType="done"
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 20,         // added top margin to move heading down
    marginBottom: 30,      // slightly reduced bottom margin for tighter spacing
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,       // reduced gap under labels
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,      // reduced space between inputs
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111',
    marginBottom: 20,      // reduced gap between inputs
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notesInput: {
    height: 100,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 180,
    marginBottom: 20,      // reduced gap here as well
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  imageSubText: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  saveButton: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 40,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
