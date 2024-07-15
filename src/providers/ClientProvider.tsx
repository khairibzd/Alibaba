"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <SessionProvider> */}
      <ClerkProvider>
        <Toaster />
        {children}
      </ClerkProvider>

      {/* </SessionProvider> */}
    </QueryClientProvider>
  );
};

export default ClientProvider;
