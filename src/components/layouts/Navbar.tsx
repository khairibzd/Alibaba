'use client'

import type { User } from 'next-auth'
import Link from 'next/link'

import SearchButton from '@/components/layouts/SearchButton'
import CartButton from '@/components/cart/CartButton'
import DesktopNav from '@/components/layouts/DesktopNav'
import MobileNav from '@/components/layouts/MobileNav'
import { buttonVariants } from '@/components/ui/Button'
import { UserButton, useUser } from '@clerk/nextjs'
import UserAccountNav from '../auth/UserAcountNav'

interface NavbarProps {
  user?: User & {
    id: string
  }
}
const Navbar= () => {
  // const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background py-3">
      <nav className="container px-2 sm:px-4 lg:px-6 flex items-center justify-between">
        {/* Left */}
        <MobileNav />
        <DesktopNav />

        {/* Right */}
        <div className="flex items-center gap-x-2">
          <SearchButton />
          <CartButton />
         
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
