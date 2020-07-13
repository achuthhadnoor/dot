import React from 'react'
import styled from 'styled-components'

export default()=>(
    <LoadingWrapper style={{display:'flex',height:'100%',textAlign:'center'}}>
        <h1>We are getting things Ready</h1>
    </LoadingWrapper>
)

const LoadingWrapper = styled.div`
    display:flex;
    height:100%;
    align-items:center;
    justify-content:center;
`