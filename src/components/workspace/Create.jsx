import React from 'react'
export default({onClick})=>(
    <div style={{display:'block',padding:10,background:'rgba(0,0,0,.2)',position:'fixed',height:'100vh',width:'100vw'}}>
        create popup
        <button onClick={onClick}>close</button>
    </div>
)