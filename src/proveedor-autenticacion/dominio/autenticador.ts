export interface Autenticador {
  autorizar(id: string): Promise<void>;
}
