// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserCredentials, UserData, getUserData } from '@root/services/get-user-data';

import type { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';
import { sleep } from '@root/utils/sleep';

type ErrorMessage = {
  message: string
}

export default async function handler(request: NextApiRequest, response: NextApiResponse<UserData | ErrorMessage>) {
  const userCredentials = JSON.parse(request.body) as UserCredentials;

  if (request.method !== 'POST') return;

  await sleep(1500);

  try {
    const userData = await getUserData({ ...userCredentials });
    const plainTextUserData = JSON.stringify(userData);

    const userDataCookie = serialize('userData', plainTextUserData, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60,
      sameSite: 'strict',
      path: '/',
    });

    if (userData) {
      response.setHeader('Set-Cookie', userDataCookie);
      response.status(200).json(userData);
    }
  } catch {
    response.status(400).json({ message: 'Invalid credentials.' });
  }
}
