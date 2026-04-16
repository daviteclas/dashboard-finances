import { useTransactionStore } from "@/store/useTransactionStore";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

export default function TransactionDetailsScreen() {

  const transactions = useTransactionStore((state) => state.transactions);
  
  const { id } = useLocalSearchParams<{ id: string }>();

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Transação não encontrada.</Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Voltar para o Início</Text>
        </Pressable>
      </View>
    );
  }

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(transaction.amount);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.title}>{transaction.title}</Text>

        <Text style={styles.label}>Valor</Text>
        <Text
          style={[
            styles.amountBase,
            transaction.type === "income"
              ? styles.incomeText
              : styles.expenseText,
          ]}
        >
          {transaction.type === "expense" ? "- " : "+ "}
          {formattedAmount}
        </Text>
        <Text style={styles.label}>Data do Registro</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F4F5",
  },
  centeredContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F4F5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    // Sombras nativas para destacar o cartão
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "#A1A1AA",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27272A",
  },
  amountBase: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 4,
  },
  incomeText: {
    color: "#10B981",
  },
  expenseText: {
    color: "#EF4444",
  },
  date: {
    fontSize: 16,
    color: "#52525B",
  },
  errorText: {
    fontSize: 18,
    color: "#3F3F46",
    marginBottom: 20,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#18181B", // Botão escuro (padrão moderno)
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8, // Feedback visual de clique nativo
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
