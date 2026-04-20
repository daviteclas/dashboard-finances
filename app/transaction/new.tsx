import { useAppTheme } from "@/hooks/useAppTheme";
import { useTransactionStore } from "@/store/useTransactionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, Stack, useLocalSearchParams } from "expo-router"; // <-- Adicionado Stack e Params
import { useEffect } from "react"; // <-- Adicionado useEffect
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "O título precisa ter ao menos 3 caracteres"),
  amount: z.string().min(1, "Digite ao menos um numero"),
  type: z.enum(["income", "expense"], {
    required_error: "Selecione se é receita ou despesa.",
  }),
});

type TransactionFormData = z.infer<typeof schema>;

export default function NewTransactionScreen() {
  const { theme } = useAppTheme();

  // 1. Puxa o ID da rota
  const { id } = useLocalSearchParams<{ id: string }>();

  // 2. Puxa TODAS as ferramentas necessárias do Zustand
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );
  const transactions = useTransactionStore((state) => state.transactions);

  // 3. Descobre se estamos no modo de edição
  const isEditing = !!id;
  const transactionToEdit = transactions.find((t) => t.id === id);

  const {
    control,
    handleSubmit,
    reset, // <-- Extraímos o reset para preencher o formulário
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(schema),
  });

  // 4. Preenche os dados automaticamente assim que a tela abre (se for edição)
  useEffect(() => {
    if (isEditing && transactionToEdit) {
      reset({
        title: transactionToEdit.title,
        amount: transactionToEdit.amount.toString(), // Transforma o número em texto para o input
        type: transactionToEdit.type,
      });
    }
  }, [isEditing, transactionToEdit, reset]);

  // 5. A nova função Inteligente de Salvar
  function handleSave(data: TransactionFormData) {
    const valorTratado = parseFloat(data.amount.replace(",", "."));

    if (isEditing) {
      updateTransaction(id, {
        title: data.title.trim(),
        amount: valorTratado,
        type: data.type,
      });
    } else {
      addTransaction({
        title: data.title.trim(),
        amount: valorTratado,
        type: data.type,
      });
    }

    router.back();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* 6. Altera o título do cabeçalho dinamicamente! */}
        <Stack.Screen
          options={{ title: isEditing ? "Editar Transação" : "Nova Transação" }}
        />

        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { color: theme.text }]}>
              Nome da Transação
            </Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    { color: theme.text, backgroundColor: theme.card },
                  ]}
                  placeholder="Ex: Almoço"
                  placeholderTextColor="#a1a1aa"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="sentences"
                />
              )}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title.message}</Text>
            )}
          </View>

          <View>
            <Text style={[styles.label, { color: theme.text }]}>
              Valor (R$)
            </Text>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    { color: theme.text, backgroundColor: theme.card },
                  ]}
                  placeholder="0,00"
                  placeholderTextColor="#a1a1aa"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="decimal-pad"
                />
              )}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount.message}</Text>
            )}
          </View>

          <View>
            <Text style={[styles.label, { color: theme.text }]}>
              Tipo de Transação
            </Text>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <View style={styles.segmentedControl}>
                  <Pressable
                    style={[
                      [styles.typeButton, { backgroundColor: theme.card }],
                      value === "income" && styles.incomeActive,
                      errors.type && styles.inputError,
                    ]}
                    onPress={() => onChange("income")}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        value === "income" && styles.textActive,
                      ]}
                    >
                      Receita
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.typeButton,
                      { backgroundColor: theme.card },
                      value === "expense" && styles.expenseActive,
                      errors.type && styles.inputError,
                    ]}
                    onPress={() => onChange("expense")}
                  >
                    <Text
                      style={[
                        { color: theme.text },
                        styles.typeButtonText,
                        value === "expense" && styles.textActive,
                      ]}
                    >
                      Despesa
                    </Text>
                  </Pressable>
                </View>
              )}
            />
            {errors.type && (
              <Text style={styles.errorText}>{errors.type.message}</Text>
            )}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleSubmit(handleSave)}
        >
          {/* 7. Texto do botão muda dependendo do modo */}
          <Text style={[styles.saveButtonText]}>
            {isEditing ? "Salvar Alterações" : "Salvar Transação"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ... Os styles continuam exatamente iguais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f4f4f5",
    justifyContent: "space-between",
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3f3f46",
    margin: 8,
  },
  input: {
    backgroundColor: "#fff",
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#18181B",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    padding: 15,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  segmentedControl: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    backgroundColor: "#FFFFFF",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#71717A",
  },
  incomeActive: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  expenseActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  textActive: {
    color: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#10B981",
    color: "#fff",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
