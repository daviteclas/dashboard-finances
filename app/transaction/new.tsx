import { useTransactionStore } from "@/store/useTransactionStore";
import { useAppTheme } from "@/hooks/useAppTheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
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

  const addTransacrion = useTransactionStore((state) => state.addTransaction);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(schema),
  });

  function handleSave(data: TransactionFormData) {
    addTransacrion({
      title: data.title.trim(),
      amount: parseFloat(data.amount.replace(",", ".")),
      type: data.type,
    });

    router.back();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { color: theme.text }]}>Nome da Transação</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: theme.card } ]}
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
            <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: theme.card } ]}
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
            <Text style={[styles.label, { color: theme.text }]}>Tipo de Transação</Text>
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
                        styles.typeButtonText, { color: theme.text },
                        value === "income" && styles.textActive,
                      ]}
                    >
                      Receita
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.typeButton, { backgroundColor: theme.card },
                      value === "expense" && styles.expenseActive,
                      errors.type && styles.inputError,
                    ]}
                    onPress={() => onChange("expense")}
                  >
                    <Text
                      style={[
                        styles.typeButtonText, { color: theme.text },
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
          <Text style={[styles.saveButtonText]}>Salvar Transação</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

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
    margin: 8
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
    padding: 15
  },
  inputError: {
    borderColor: "#EF4444", // Borda vermelha para dar feedback visual de erro
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  segmentedControl: {
    flexDirection: "row",
    gap: 12, // Espaço entre os dois botões
  },
  typeButton: {
    flex: 1, // Faz ambos os botões terem exatamente a mesma largura (50% cada)
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
    color: "#71717A", // Cinza quando inativo
  },
  // Classes Ativas
  incomeActive: {
    backgroundColor: "#10B981", // Fundo Verde
    borderColor: "#10B981",
  },
  expenseActive: {
    backgroundColor: "#EF4444", // Fundo Vermelho
    borderColor: "#EF4444",
  },
  textActive: {
    color: "#FFFFFF", // Texto branco quando ativo
  },
  saveButton: {
    backgroundColor: "#10B981",
    color: '#fff',
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Distância segura da borda inferior
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
