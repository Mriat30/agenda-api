export interface RepositorioBase<T> {
  guardar(entity: T): Promise<void>;
  obtenerTodos(): Promise<T[]>;
  borrarTodos(): Promise<void>;
}
