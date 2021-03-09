export interface Transaction {
    transactionId: number;
    debit: number;
    credit: number;
    date: string;
    description: string;
    accountTitle: string;
    staffName: string;
}
