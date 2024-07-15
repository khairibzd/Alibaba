import { redirect } from "next/navigation";

import { Heading } from "@/components/Heading";
import { StoreTabs } from "@/components/pagers/StoreTabs";
import prisma from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { getStoreById } from "@/actions/get-stores";

export default async function UpdateStoreLayout({
  children,
  params: { storeId },
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // const {userId} = useAuth()
  const store = getStoreById(storeId);  
  
  if (!store) {
    return redirect("/dashboard/stores");
  }
  return (
    <>
      <Heading
        className="mb-8"
        title="Dashboard"
        description="Manage your store"
      />
      <section className="space-y-8 overflow-auto">
        <StoreTabs storeId={storeId} />
        {children}
      </section>
    </>
  );
}
