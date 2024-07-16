import { createClient } from '@/utils/supabase/server';
import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const supabase = createClient()

    const { data } = await supabase.auth.getUser()    
    if (!data.user) {
      throw new Error('Unauthorized')
    }
      // If you throw, the user will not be able to upload
    

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: data.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
