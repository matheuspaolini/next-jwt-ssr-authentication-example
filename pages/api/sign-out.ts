// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';

type Data = {
  message: string
}

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
  const emptyUserDataCookie = cookie.serialize('userData', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    sameSite: 'strict',
    path: '/',
  });

  response.setHeader('Set-Cookie', emptyUserDataCookie);
  response.status(200).json({ message: 'User logged out.' });
}
