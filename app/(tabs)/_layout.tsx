import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Registro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'document-lock' : 'document-lock'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AcercaDe"
        options={{
          title: 'AcercaDe',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BotonEmergencia"
        options={{ 
          title: 'BorrarRegistros',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'lock-closed' : 'lock-closed-outline'} color={color} />
          ),
        }}
      /> 
    </Tabs>     
  );
}
