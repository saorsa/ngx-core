
export type NgxInspectMode = 'raw' | 'hierarchical';

export type NgxInspectType = 'undefined'
  | 'null'
  | 'boolean'
  | 'number'
  | 'string'
  | 'array'
  | 'object'
  | 'function'
  | 'unknown';

export interface NgxInspectConfig {
  enabled?: boolean;
  mode?: NgxInspectMode;
}

export interface SimpleDictionary<TValue> {
  [Key: string]: TValue;
}
