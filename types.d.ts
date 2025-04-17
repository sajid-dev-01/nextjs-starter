type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface OffsetPaginateResponse<T> {
  total: number;
  limit: number;
  currentPage: number;
  totalPage: number;
  data: T[];
}

interface CursorPaginateResponse<T> {
  total: number;
  limit: number;
  cursor: string;
  nextCursor: string | null;
  data: T[];
}
