import { db, type DrizzleTransaction } from "~/server/db/drizzle";

import { type TransactionManager } from "./transaction-manager";

export class DrizzleTransactionManager implements TransactionManager {
  public startTransaction<T>(
    clb: (tx: DrizzleTransaction) => Promise<T>,
    parent?: DrizzleTransaction
  ): Promise<T> {
    const invoker = parent ?? db;
    return invoker.transaction(clb);
  }
}
