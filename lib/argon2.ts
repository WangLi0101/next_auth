import argon2 from "argon2";
export const ecode = async (password: string) => {
  const res = await argon2.hash(password);
  return res;
};

export const verify = async (password: string, hash: string) => {
  const res = await argon2.verify(hash, password);
  return res;
};
