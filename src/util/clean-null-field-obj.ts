export function cleanNullFieldObj<T extends object>(dto: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(dto).filter(([, value]) => value !== undefined && value !== null),
  ) as Partial<T>;
}
