import slugify from 'slugify'
import { z } from 'zod'

import prisma from '@/lib/db'
import { storeSchema } from '@/lib/validators/store'
import { auth, getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = createClient()

    const { data } = await supabase.auth.getUser()    
    if (!data.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    console.log('this is the bidy',body)
    const { name, description } = storeSchema.parse(body)
     console.log(name,description)
    const slug = slugify(name, {
      lower: true,
    })

    const isStoreExist = await prisma.store.findUnique({
      where: {
        id: slug,
      },
    })

    if (isStoreExist) {
      return new Response('Store name is already exist', { status: 409 })
    }
    
    await prisma.store.create({
      data: {
        id: slug,
        name,
        description,
        userId:data.user.id,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    console.log(error)

    return new Response('Could not create store, please try again later.', {
      status: 500,
    })
  }
}
