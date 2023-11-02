'use client'
import { Button, MantineProvider,createTheme,PartialVarsResolver, ButtonFactory, CSSVariablesResolver } from "@mantine/core";
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";
import '@mantine/core/styles.css';


type Children={
    children:ReactNode
}
 const theme=createTheme({
  components:{
    Button:Button.extend({
      vars:(theme,props)=>{
        return{
          root:{
            '--button-hover': 'rgb(18 20 23)'
          }
        }
      }
    })
  }
}) 


const Provider = ({children}:Children) => {
  return (
<SessionProvider>
  <MantineProvider defaultColorScheme="dark"  theme={theme} >
  {children}
  </MantineProvider>
</SessionProvider>
  )
}

export default Provider


