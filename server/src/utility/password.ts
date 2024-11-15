import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function hashPassword(rawPassword: string): string {
  return bcrypt.hashSync(rawPassword, 10);
}

export function comparePassword(
  rawPassword: string,
  encryptedPassword: string
): boolean {
  return bcrypt.compareSync(rawPassword, encryptedPassword);
}
