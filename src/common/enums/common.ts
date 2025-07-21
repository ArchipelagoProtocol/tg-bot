export type EnumValues<T> = T[keyof T]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValues<T extends Record<string, any>>(obj: T): [T[keyof T]] {
  return Object.values(obj) as [(typeof obj)[keyof T]]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValuesNum<T extends Record<number, any>>(
  obj: T
): [T[keyof T]] {
  return Object.values(obj) as [(typeof obj)[keyof T]]
}