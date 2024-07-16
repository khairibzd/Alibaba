
import type { User } from 'next-auth'
import Link from 'next/link'

import SearchButton from '@/components/layouts/SearchButton'
import CartButton from '@/components/cart/CartButton'

import { buttonVariants } from '@/components/ui/Button'
import { UserButton, useUser } from '@clerk/nextjs'
import DashboardMobileNav from './DashboardMobileNav'
import DashboardDesktopNav from './DashboardDesktopNav'
import UserAccountNav from '../auth/UserAcountNav'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// interface NavbarProps {
//   user?: User & {
//     id: string
//   }
// }
const DashboardNav = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background py-3">
      <nav className="container px-2 sm:px-4 lg:px-6 flex items-center justify-between">
        {/* Left */}
        <DashboardMobileNav />
        <DashboardDesktopNav />

        {/* Right */}
        <div className="flex items-center gap-x-2">
        {data.user ? (
            <UserAccountNav user={data.user} />
          ) : (
            <Link
              href='/sign-in'
              className={buttonVariants({
                size: 'sm',
              })}
            >
              Sign In
              <span className='sr-only'>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
