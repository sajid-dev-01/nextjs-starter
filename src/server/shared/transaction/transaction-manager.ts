export interface ITransaction {
  rollback: () => void;
}

export interface TransactionManager {
  startTransaction<T>(
    cb: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction
  ): Promise<T>;
}
