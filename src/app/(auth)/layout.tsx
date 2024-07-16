import { Icons } from "@/components/Icons";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { useEffect } from "react";

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {

  return (
    <main className="container mt-10 absolute justify-center  flex  items-center  md:flex  ">
      {children}
    </main>
  );
}
