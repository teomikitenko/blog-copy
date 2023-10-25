import Image from 'next/image'
import HomePosts from '@/components/Home'

export default function HomePage() {
  return (
    <div className='home_page' >
     <h1>Home</h1>
     <HomePosts/>
    </div>
  )
}
