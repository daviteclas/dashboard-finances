import { SummaryCard } from "@/components/SummaryCard";
import { useTransactionStore } from "@/store/useTransactionStore";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TransactionCard } from "../../components/TransactionCard";

export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);

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
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<SummaryCard />}
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
});
