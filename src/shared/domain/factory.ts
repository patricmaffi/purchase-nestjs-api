export interface Factory<M, T> {
  build(model: M): T;

  buildMany(model: M[]): T[];
}
