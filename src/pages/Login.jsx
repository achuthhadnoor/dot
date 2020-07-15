import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-icons-kit'
import { github } from 'react-icons-kit/feather'
import Api from '../api'
import styled from 'styled-components'
export class Login extends Component {
    state = {
        islogging: false, 
    }
    login = () => {
        this.setState({ islogging: true })
        Api.login(this.props.dispatch).then( () => {   
            this.props.history.replace('/onboarding')
        }).catch(()=>{
            this.setState({islogging:false})
            this.props.history.replace('/')
        })
    }
    render() { 
        return (
            <Wrapper> 
                <h1 style={{fontSize:24,padding:10}}>Login</h1>
                {
                this.state.islogging ?
                <div>logging....</div>
                :
                <GITHUBLOGIN onClick={this.login}><Icon icon={github} /> Continue with GitHub</GITHUBLOGIN>
                }
            </Wrapper>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(Login)

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100%;
    background:#efefef;
`

const GITHUBLOGIN = styled.button`
    padding: 10px 15px;
    background:#121212;
    color:#fff;
    border:none;
    border-radius:5px;
    font-weight:400;
    cursor:pointer;
`
