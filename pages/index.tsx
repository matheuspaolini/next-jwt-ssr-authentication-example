import { FormEvent, Fragment, useState } from 'react';

import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';

type Props = {
  notAuthMessage?: string;
}

export default function Home({ notAuthMessage }: Props) {
  const router = useRouter();

  const [userCredentials, setUserCredentials] = useState({
    username: 'john@mail.com',
    password: 'changeme',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const plainTextUserCredentials = JSON.stringify(userCredentials);

    const response = await fetch('/api/sign-in', {
      method: 'POST',
      body: plainTextUserCredentials
    });

    const data = await response.json();

    router.push('/secure');

    setIsLoading(false);
  }

  return (
    <Fragment>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={userCredentials.username}
          placeholder="Enter your username or e-mail"
          onChange={(e) => setUserCredentials((state) => ({ ...state, username: e.target.value }))}
        />
        <br />

        <input
          value={userCredentials.password}
          placeholder="Enter your password"
          onChange={(e) => setUserCredentials((state) => ({ ...state, password: e.target.value }))}
        />
        <br />

        <button type="submit">Login</button>
      </form>


      {notAuthMessage && <small><br />{notAuthMessage}<br /><br /></small>}

      {isLoading && <small><br />Sending form...<br /><br /></small>}


      <Link href="/secure">Secure</Link>
      <br />

      <Link href="/secure/nested-secure">Nested Secure</Link>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  const query = context.query;

  const notAuthMessage = query.notAuthMessage || '';

  if (cookies.userData) {
    return {
      redirect: {
        destination: '/secure',
        permanent: false,
      }
    }
  }

  return {
    props: {
      notAuthMessage
    }
  }
}
