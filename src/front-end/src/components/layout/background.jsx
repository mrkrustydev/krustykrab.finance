import React, {useState, useEffect, useContext, useRef} from 'react'

import {Image} from '../../pancake-uikit/src'



const Background = () =>{


      return(
          <Image 
            alt="Background"
            src="krusty-bg-2.png"
            style={{        
                padding:'0px',
                margin:'0px',
                position:'fixed',
                alignContent:'right',
                width:'100vw', 
                height:'100vh', 
                zIndex:-100}}
        />
      )
}

export default Background