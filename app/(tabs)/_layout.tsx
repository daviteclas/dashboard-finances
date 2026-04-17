import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#10B981" }}>
      <Tabs.Screen
        name="index"
        options={{
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
