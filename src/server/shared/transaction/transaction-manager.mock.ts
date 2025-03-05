import { ITransaction, TransactionManager } from "./transaction-manager";

export class MockTransactionManager implements TransactionManager {
  public startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>
  ): Promise<T> {
    return clb({ rollback: () => {} });
  }
}
