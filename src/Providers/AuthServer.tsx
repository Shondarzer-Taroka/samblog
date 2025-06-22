// app/components/AuthServer.tsx

import { getUserFromCookie } from "@/hooks/auth";

const AuthServer = async () => {
  const user = await getUserFromCookie(); // ✅ Await the user
console.log(user);

  return (
    <div>
      {user ? (
        <p>স্বাগতম, {user.name}</p>
      ) : (
        <p>আপনি লগইন করেননি</p>
      )}
    </div>
  );
};

export default AuthServer;

