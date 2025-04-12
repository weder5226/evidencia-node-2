import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashEncode = async (text: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

export const hashMatches = async (raw: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(raw, hash);
};
