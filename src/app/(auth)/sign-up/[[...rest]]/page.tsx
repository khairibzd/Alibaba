import Link from 'next/link'
// import OAuthSignIn from '@/components/auth/OAuthSignIn'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/Card'
import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage() {
  
  return (
    <div className='mx-auto'>
      {/* <Card className='w- xl:w-[500px]'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1'>
          <OAuthSignIn />
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 inline-block'>
              Already have an account?
            </span>
            <Link
              aria-label='Sign in'
              href='/sign-in'
              className='text-primary underline-offset-4 transition-colors hover:underline'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card> */}
      <SignUp
            appearance={{
              elements: {
                formButtonPrimary: {
                  fontSize: 14,
                  textTransform: "none",
                  backgroundColor: "#071952",
                  "&:hover, &:focus, &:active": {
                    backgroundColor: "#37B7C3",
                  },
                },
              },
            }}
            path="/sign-up"
          />
    </div>
  )
}
