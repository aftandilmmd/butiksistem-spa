import { v4 as uuidv4 } from "uuid";

function TransactionResource(transaction = {}) {
  return {
    hash_id: transaction.hash_id || uuidv4(),
    paymentType: transaction.paymentType || "cash",
    amount: transaction.amount || 0,
  };
}

function TransactionResourceCollection(transactions = []) {
  return transactions.map((transaction) => TransactionResource(transaction));
}

export { TransactionResource, TransactionResourceCollection };
