
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

export type NgxInspectStructuredState = 'expanded'
  | 'collapsed'
  | 'mixed';

export interface NgxInspectConfig {
  enabled?: boolean;
  mode?: NgxInspectMode;
}
