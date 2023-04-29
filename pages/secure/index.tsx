import { Fragment } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { UserData } from '@root/services/get-user-data';
import { notAuthMessageQuery } from '@root/constants/not-auth-message-query';

type Props = {

} & InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Secure({ userData }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/sign-out');
    router.push('/');
  }

  console.log('This console won\'t trigger if user is unauthenticated');

  return (
    <Fragment>
      <h1>Secure Page.</h1>

      <div>
        <b>Username:</b> {userData.username}
      </div>

      <div>
        <b>Token:</b> {userData.token}
      </div>

      <button onClick={handleLogout}>Logout</button>
      <br /><br />

      <Link href="/">Sign In</Link>
      <br />

      <Link href="/secure/nested-secure">Nested Secure</Link>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<{ userData: UserData }> = async (context) => {
  const cookies = context.req.cookies;

  if (cookies.userData) {
    return {
      props: {
        userData: JSON.parse(cookies.userData)
      }
    }
  }

  return {
    redirect: {
      destination: '/' + notAuthMessageQuery,
      permanent: false,
    }
  }
}
