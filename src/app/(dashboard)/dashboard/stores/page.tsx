import Link from "next/link";

import { Heading } from "@/components/Heading";
import { StoreCard } from "@/components/cards/StoreCard";
import { buttonVariants } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

import { getStores } from "@/actions/get-stores";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const StorePage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const stores = await getStores();
  // console.log(stores)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Stores" description="Manage your stores" />
        {stores.length > 0 && (
          <Link className={buttonVariants()} href="/dashboard/stores/new">
            Create store
          </Link>
        )}
      </div>

      <Separator className="my-4" />
      {stores.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store!} />
          ))}
        </section>
      ) : (
        <section className="flex h-[50vh] text-center gap-4 flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl">You dont have any store</h2>
          <Link className={buttonVariants()} href="/dashboard/stores/new">
            Create a new store
          </Link>
        </section>
      )}
    </>
  );
};

export default StorePage;
