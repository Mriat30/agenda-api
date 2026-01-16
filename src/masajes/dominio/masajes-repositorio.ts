export interface MasajesRepositorio {
  guardar(masaje: Masaje): Promise<void>;
}
