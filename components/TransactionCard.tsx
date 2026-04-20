import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

// definir forma que os valores serão recebidos
interface TransactionCardProps {
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    onPress?: () => void;
}

// função que recebe o conjunto de dados e retona o card com os dados
export function TransactionCard( {title, amount, type, date, onPress}: TransactionCardProps ) {
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(amount);

    const { theme } = useAppTheme();

    return (
        <Pressable 
            style={({ pressed }) => [
                [styles.container, { backgroundColor: theme.card, borderColor: theme.border }],
                pressed && { opacity: 0.7 }]} 
            onPress={onPress}
        >
            <View style={[styles.infoGroup]}>
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                <Text style={[styles.date, { color: theme.textMuted }]}>{date}</Text>
            </View>

            <Text style={[ styles.amountBase, type === 'income' ? styles.incomeText : styles.expenseText ]}>
                {type === 'expense' ? '- ' : '+ '}
                {formattedAmount}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoGroup: {
        flex: 1, // Ocupa o espaço disponível sem empurrar o valor para fora da tela
        paddingRight: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
    },
    amountBase: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    incomeText: {
        color: '#10B981', // Verde esmeralda (padrão de mercado para sucesso/receita)
    },
    expenseText: {
        color: '#EF4444', // Vermelho (padrão para alerta/despesa)
    },
});