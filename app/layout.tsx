import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './style.scss'
import Leftbar from '@/components/leftbar'
import Rightbar from '@/components/rightbar'
import Provider from '@/components/Provider'
import Header from '@/components/Header'


const inter = Inter({
  subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <div className="content">
        <header>
          <Provider>
            <Header/>
          </Provider>
          </header>
        <main className={inter.className}>
          <section className='left_side_bar'>
            <Leftbar/>
          </section>
          <section className='content_bar'>
          <Provider>
              {children}
            </Provider>
          </section>
          <section className='right_side_bar'>
           <Rightbar/>
          </section>
        </main>
        </div>
        </body>
    </html>
  )
}
