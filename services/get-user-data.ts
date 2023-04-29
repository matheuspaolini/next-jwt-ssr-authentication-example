import { user } from '@root/constants/user';

export type UserCredentials = {
  username: string;
  password: string;
}

export type UserData = {
  username: string;
  token: string;
}

export async function getUserData({ username, password }: UserCredentials) {
  if (username === 'john@mail.com' && password === 'changeme') {
    return user;
  }

  return null;
}
