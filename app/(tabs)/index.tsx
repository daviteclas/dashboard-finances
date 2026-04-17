import React, { useState, useEffect } from 'react';
import { SummaryCard } from "@/components/SummaryCard";
import { useTransactionStore } from "@/store/useTransactionStore";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import { TransactionCard } from "../../components/TransactionCard";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);

  const loadTransactions = useTransactionStore((state) => state.loadTransaction);

  const [searchText, setSearchText] = useState('');

  const filteredTransactions = transactions.filter((t) => 
    t.title.toLowerCase().includes(searchText.toLocaleLowerCase())
  )

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não possui transações.
          </Text>
        </View>
      ) : (
        <>

          <SummaryCard />
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#A1A1AA" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInputWithIcon}
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
    </View>
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
