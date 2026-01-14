export interface Autenticador {
  esAdmin(id: string): Promise<boolean>;
}
