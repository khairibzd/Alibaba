"use server";

import { auth } from "@clerk/nextjs/server";
import { Store } from "@prisma/client";
import prisma from '@/lib/db'

export const getStores = async (): Promise<Store[]> => {
  const { userId } = auth();
  console.log(userId);
  const stores = await prisma.store.findMany({
    where: {
      userId: userId as any,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return stores;
};

export const getStoreById = async (storeId: String): Promise<Store> => {
  const { userId } = auth();

  const Store = await prisma.store.findFirst({
    where: {
      id: storeId as any,
      userId: userId as any,
    },
  });
  return Store as any;
};
