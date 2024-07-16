"use server";

import { auth } from "@clerk/nextjs/server";
import { Product, Store } from "@prisma/client";
import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { AnyAaaaRecord } from "dns";
import { ProductColumn } from "@/app/(dashboard)/dashboard/stores/[storeId]/components/columns";

export const getStores = async (): Promise<Store[]> => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const stores = await prisma.store.findMany({
    where: {
      userId: data.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return stores;
};

export const getStoreById = async (storeId: String): Promise<Store> => {

  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const Store = await prisma.store.findFirst({
    where: {
      id: storeId as any,
      userId: data.user?.id,
    },
  });
  return Store as any;
};
