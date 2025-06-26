import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const onChangePassword = () => Alert.alert('Change Password', 'Feature coming soon!');
  const onLanguageSelect = () => Alert.alert('Language', 'Feature coming soon!');
  const onAboutPress = () => Alert.alert('About', 'TrackStack v1.0.0\n© 2025 TrackStack Inc.');
  const onPrivacyPolicy = () => Alert.alert('Privacy Policy', 'Feature coming soon!');
  const onClearCache = () => Alert.alert('Clear Cache', 'Cache cleared!');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Settings</Text>

      {/* Notifications & Appearance */}
      <Text style={styles.sectionHeader}>Notifications & Appearance</Text>

      <View style={styles.settingRow}>
        <View style={styles.rowLeft}>
          <Feather name="bell" size={22} color="#007aff" style={styles.icon} />
          <Text style={styles.settingLabel}>Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#ccc', true: '#007aff' }}
          thumbColor="#fff"
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.rowLeft}>
          <Feather name="moon" size={22} color="#007aff" style={styles.icon} />
          <Text style={styles.settingLabel}>Dark Mode</Text>
        </View>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: '#ccc', true: '#007aff' }}
          thumbColor="#fff"
        />
      </View>

      {/* Account */}
      <Text style={styles.sectionHeader}>Account</Text>

      <TouchableOpacity style={styles.touchableRow} onPress={onChangePassword} activeOpacity={0.6}>
        <View style={styles.rowLeft}>
          <Feather name="lock" size={22} color="#555" style={styles.icon} />
          <Text style={styles.settingLabel}>Change Password</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={26} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableRow} onPress={onLanguageSelect} activeOpacity={0.6}>
        <View style={styles.rowLeft}>
          <Feather name="globe" size={22} color="#555" style={styles.icon} />
          <Text style={styles.settingLabel}>Language</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={26} color="#999" />
      </TouchableOpacity>

      {/* Privacy & Data */}
      <Text style={styles.sectionHeader}>Privacy & Data</Text>

      <TouchableOpacity style={styles.touchableRow} onPress={onPrivacyPolicy} activeOpacity={0.6}>
        <View style={styles.rowLeft}>
          <Feather name="shield" size={22} color="#555" style={styles.icon} />
          <Text style={styles.settingLabel}>Privacy Policy</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={26} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableRow} onPress={onClearCache} activeOpacity={0.6}>
        <View style={styles.rowLeft}>
          <Feather name="trash-2" size={22} color="#555" style={styles.icon} />
          <Text style={styles.settingLabel}>Clear Cache</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={26} color="#999" />
      </TouchableOpacity>

      {/* About */}
      <Text style={styles.sectionHeader}>About</Text>

      <TouchableOpacity style={styles.touchableRow} onPress={onAboutPress} activeOpacity={0.6}>
        <View style={styles.rowLeft}>
          <Feather name="info" size={22} color="#555" style={styles.icon} />
          <Text style={styles.settingLabel}>About TrackStack</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={26} color="#999" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // soft off-white for less eye strain
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666',
    marginTop: 30,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 18,
    color: '#111',
  },
});
