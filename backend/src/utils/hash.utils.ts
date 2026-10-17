import bcrypt from 'bcrypt';

export const generateHashPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const compareHashPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
