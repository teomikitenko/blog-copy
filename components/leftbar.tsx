import React from 'react'
import  Image  from 'next/image'
import Link from 'next/link'
import home from '@/public/assets/home.svg'
import search from '@/public/assets/search.svg'
import activity from '@/public/assets/heart.svg'
import create from '@/public/assets/create.svg'
import communities from '@/public/assets/community.svg'
import profile from '@/public/assets/profile.svg'


type Link={
 name:string,
 href:string,
 src:any
}

const Leftbar = () => {
    const nav=[
        {name:"Home",href:'/',src:home},
        {name:"Search",href:'/',src:search},
        {name:"Activity",href:'/',src:activity},
        {name:"Create Thread",href:'/',src:create},
        {name:"Communities",href:'/',src:communities},
        {name:"Profile",href:'/',src:profile}
    ]
  return (
    <div className="leftbar">
        <div className="leftbar_links_container">
            {nav.map((n:Link)=>(
                <div className='link'>
                <Image src={n.src} width={28} height={28} alt='icon'/>
                <Link href={n.href}><p>{n.name}</p></Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Leftbar