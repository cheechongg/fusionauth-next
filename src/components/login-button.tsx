import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Component() {
  const { data: session, ...rest }: any = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        Status: Logged in as {session.user.email} <br />
        <button onClick={() => signOut()}>Log out</button>
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
