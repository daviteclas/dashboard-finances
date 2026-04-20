import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: "#10B981",
        tabBarInactiveTintColor: theme.textMuted, 
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border
        },
        headerStyle: {
          backgroundColor: theme.background,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerTintColor: theme.text
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/transaction/new");
          },
        })}
        options={{
          title: "Nova",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
