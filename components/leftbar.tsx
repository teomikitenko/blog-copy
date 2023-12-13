"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import home from "@/public/assets/home.svg";
import search from "@/public/assets/search.svg";
import activity from "@/public/assets/heart.svg";
import create from "@/public/assets/create.svg";
import communities from "@/public/assets/community.svg";
import profile from "@/public/assets/profile.svg";
import logout from "@/public/assets/logout.svg";
import { signOut, useSession } from "next-auth/react";
import { Text } from "@mantine/core";

type Link = {
  name: string;
  href: string;
  src: any;
  auth:boolean
};

const Leftbar = () => {
  const session = useSession()
  const nav = [
    { name: "Home", href: "/", src: home,auth:false },
    { name: "Search", href: "/search", src: search,auth:false },
    { name: "Activity", href: "/activity", src: activity,auth:true },
    { name: "Create ", href: "/create", src: create,auth:true },
    { name: "Communities", href: "/communities", src: communities,auth:false },
    { name: "Profile", href: "/profile", src: profile,auth:true },
  ];
  console.log(session)
  return (
    <div className="leftbar">
      <div className="leftbar_links_container">
        {nav.map((n: Link) =>{
          if(session.status ==='unauthenticated')
          if(n.auth)return null
          else return(
            <Link key={n.name} href={n.href}>
            <div key={n.name} className="link">
              <Image src={n.src} width={24} height={24} alt="icon" />
              <Text visibleFrom="md" size="xs">{n.name}</Text>
            </div>
          </Link>
          )
          if(session.status === 'authenticated') return(
            <Link key={n.name} href={n.href}>
            <div key={n.name} className="link">
              <Image src={n.src} width={24} height={24} alt="icon" />
              <Text visibleFrom="md" size="xs">{n.name}</Text>
            </div>
          </Link>)
        }
        )}
        <div style={{ marginTop: "12px" }} className="link link_sign_out">
          <Image src={logout} width={28} height={28} alt="icon" />
          <p onClick={() => signOut()}>Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
