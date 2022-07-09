
export interface Dictionary<TValue> {
  [Key: string | number | symbol]: TValue;
}
