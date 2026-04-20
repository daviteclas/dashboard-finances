import React, { useState, useEffect } from 'react';
import { SummaryCard } from "@/components/SummaryCard";
import { useTransactionStore } from "@/store/useTransactionStore";
import { router } from "expo-router";
import { View, FlatList, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionCard } from "../../components/TransactionCard";
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useThemeStore } from '@/store/useThemeStore';


export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);

  const loadTransactions = useTransactionStore((state) => state.loadTransaction);

  const [searchText, setSearchText] = useState('');
  const filteredTransactions = transactions.filter((t) => 
    t.title.toLowerCase().includes(searchText.toLocaleLowerCase())
  )

  const { theme, activeMode } = useAppTheme();
  const setThemeMode = useThemeStore((state) => state.setThemeMode);
  const loadTheme = useThemeStore((state) => state.loadTheme)

  useEffect(() => {
    loadTransactions();
    loadTheme();
  }, []);

  function toggleTheme() {
    const { themeMode } = useThemeStore.getState();
    if (themeMode === 'system') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('light');
    else setThemeMode('system');
  }

  const currentThemeMode = useThemeStore((state) => state.themeMode);

  const getThemeIcon = () => {
    if (currentThemeMode === 'dark') return 'moon';
    if (currentThemeMode === 'light') return 'sunny';
    return 'contrast';
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>
          FinDash
        </Text>

        <Pressable 
          onPress={toggleTheme} 
          style={{ 
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.card, 
            borderRadius: 20, 
            borderWidth: 1, 
            borderColor: theme.border 
          }} 
        >
          <Ionicons name={getThemeIcon()} size={20} color={theme.text} />
        </Pressable>
      </View>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não possui transações.
          </Text>
        </View>
      ) : (
        <>
          <SummaryCard />
          <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
            <Ionicons name="search" size={20} color="#A1A1AA" style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInputWithIcon, { color: theme.text }]}
              value={searchText}
              onChangeText={setSearchText}
              placeholder='Buscar Transação...' 
              placeholderTextColor="#A1A1AA"
            />
          </View>
          <FlatList 
            data={filteredTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard
                title={item.title}
                amount={item.amount}
                type={item.type}
                date={item.date}
                onPress={() => router.push(`/transaction/${item.id}`)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F4F5", // Um fundo cinza claro ajuda a destacar o cartão branco
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#a1a1aa",
  },
  searchContainer: {
    flexDirection: 'row', // Coloca o ícone e o input lado a lado
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8, // Dá um espacinho entre a lupa e o texto
  },
  searchInputWithIcon: {
    flex: 1, // Faz o input ocupar todo o resto do espaço
    fontSize: 16,
    color: '#18181B',
    height: '100%', // Pega a altura do container pai
  },
});
