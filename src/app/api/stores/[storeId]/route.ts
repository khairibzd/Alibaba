import slugify from 'slugify'
import { z } from 'zod'

import prisma from '@/lib/db'
import { storeSchema } from '@/lib/validators/store'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/utils/supabase/server'

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const supabase = createClient()

    const { data } = await supabase.auth.getUser()    
    if (!data.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { name, description } = storeSchema.parse(body)

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

    await prisma.store.update({
      where: {
        id: params.storeId,
        userId: data.user.id,
      },
      data: {
        id: slug,
        name,
        description,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    console.log(error)

    return new Response('Could not update store, please try again later.', {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const supabase = createClient()

    const { data } = await supabase.auth.getUser()    
    if (!data.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId: data.user.id,
      },
    })

    if (!store) {
      return new Response('Store not found', { status: 404 })
    }

    await prisma.store.delete({
      where: {
        id: params.storeId,
        userId: data.user.id,
      },
    })

    return new Response('OK')
  } catch (error) {
    return new Response('Could not update store, please try again later.', {
      status: 500,
    })
  }
}
