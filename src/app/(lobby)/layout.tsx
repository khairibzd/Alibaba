import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
