'use client'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/assets/logo.svg'
import { useSession } from 'next-auth/react'
import {IconUserCircle} from '@tabler/icons-react'

const Header = () => {
    const{data:session ,status}=useSession()
   console.log(session)
  return (
    <>
    <Link href={"/"} className='link_header'>
    <Image
     src={logo}
      width={28} 
      height={28}
      alt='logo'
    />
    <p>Threads</p></Link>
    {status === 'authenticated'?<div className='sighin_container'>
     {session.user?.image?<Image style={{alignItems:'center'}} src={session?.user?.image}
      width={25}
      height={25}
      alt='avatar'/>:
      <IconUserCircle
      style={{width:'25px',height:'25px'}}
      color='var(--mantine-color-blue-filled)'
      />}
      <p style={{display:'inline-flex',alignItems:'center'}}>{session?.user?.name}</p> </div>:
      <p>Log in</p>
    }
    </>
  )
}

export default Header
