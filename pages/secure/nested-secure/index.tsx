import { Fragment } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { UserData } from '@root/services/get-user-data';
import { notAuthMessageQuery } from '@root/constants/not-auth-message-query';

export default function NestedSecure() {
  return (
    <Fragment>
      <h1>Secure Nested Secure</h1>
      <br />

      <Link href="/">Sign In</Link>
      <br />

      <Link href="/secure">Secure</Link>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<UserData> = async (context) => {
  const cookies = context.req.cookies;

  if (cookies.userData) {
    return {
      props: JSON.parse(cookies.userData)
    }
  }

  return {
    redirect: {
      destination: '/' + notAuthMessageQuery,
      permanent: false,
    }
  }
}
