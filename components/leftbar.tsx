'use client'
import React from 'react'
import  Image  from 'next/image'
import Link from 'next/link'
import home from '@/public/assets/home.svg'
import search from '@/public/assets/search.svg'
import activity from '@/public/assets/heart.svg'
import create from '@/public/assets/create.svg'
import communities from '@/public/assets/community.svg'
import profile from '@/public/assets/profile.svg'
import logout from '@/public/assets/logout.svg'
import { signOut } from "next-auth/react"


type Link={
 name:string,
 href:string,
 src:any
}

const Leftbar = () => {
    const nav=[
        {name:"Home",href:'/',src:home},
        {name:"Search",href:'/search',src:search},
        {name:"Activity",href:'/activity',src:activity},
        {name:"Create ",href:'/create',src:create},
        {name:"Communities",href:'/communities',src:communities},
        {name:"Profile",href:'/profile',src:profile}
    ]
  return (
    <div className="leftbar">
        <div className="leftbar_links_container">
            {nav.map((n:Link)=>(
                <Link key={n.name} href={n.href}>
               <div key={n.name} className='link'>
                <Image src={n.src} 
                    width={28} 
                    height={28}
                 alt='icon'/>
               <p>{n.name}</p>
                </div>
                </Link>
            ))}
            <div style={{marginTop:'27px'}} className='link link_sign_out'>
             <Image src={logout} 
                width={28}
                height={28}
                alt='icon'/>
            <p onClick={()=>signOut()}>Sign out</p>
            </div>
           
        </div>
    </div>
  )
}

export default Leftbar