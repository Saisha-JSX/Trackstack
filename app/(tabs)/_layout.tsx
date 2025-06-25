import { Tabs } from 'expo-router';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Pressable, View, StyleSheet } from 'react-native';

function NoFeedbackTabButton({ children, ...rest }: any) {
  return (
    <Pressable
      android_ripple={null}
      style={styles.tabButton}
      {...rest}
      // disable opacity change on press:
      onPressIn={(e) => {}}
      onPressOut={(e) => {}}
    >
      <View style={styles.tabButtonContent}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
  },
  tabButtonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007aff',
        tabBarStyle: {
          height: 75,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          tabBarButton: NoFeedbackTabButton,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="collections-bookmark" size={size} color={color} />
          ),
          tabBarButton: NoFeedbackTabButton,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
          tabBarButton: NoFeedbackTabButton,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarButton: NoFeedbackTabButton,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          tabBarButton: NoFeedbackTabButton,
        }}
      />
    </Tabs>
  );
}
