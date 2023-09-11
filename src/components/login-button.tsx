import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Component() {
  const { data: session, ...rest }: any = useSession();
  console.log(session);

  const logoutUser = async () => {
    signOut();
    const data = fetcher('/api/users');
  };

  if (session) {
    return (
      <>
        Status: Logged in as {session.user.email} <br />
        <button onClick={() => logoutUser()}>Log out</button>
      </>
    );
  }
  return (
    <>
      Status: Not logged in <br />
      <button onClick={() => signIn()}>Log in</button>
    </>
  );
}
