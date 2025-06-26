import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const onEditProfile = () => Alert.alert('Edit Profile', 'Feature coming soon!');
  const onViewHistory = () => Alert.alert('Viewing History', 'Feature coming soon!');
  const onLogout = () => Alert.alert('Logout', 'Are you sure?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Logout', style: 'destructive' },
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://bit.ly/3Ig6aF0' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editButton} activeOpacity={0.7} onPress={onEditProfile}>
          <Feather name="edit-2" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Feather name="film" size={24} color="#007aff" />
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Tracked Media</Text>
        </View>
        <View style={styles.statItem}>
          <Feather name="heart" size={24} color="#ff4757" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statItem}>
          <Feather name="list" size={24} color="#ffa502" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Playlists</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  editButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#007aff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    width: 100,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  }
});
