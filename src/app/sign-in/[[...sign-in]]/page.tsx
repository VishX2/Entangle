"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      const role = user?.publicMetadata?.role;

      if (role) {
        router.push(`/${role}`);
      } else {
        router.push("/"); // fallback
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-2xl p-8",
          },
        }}
      />
    </div>
  );
};

export default LoginPage;