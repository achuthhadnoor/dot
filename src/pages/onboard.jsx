import React, { Component } from 'react'
import { connect } from 'react-redux'
import Api from '../api'
export class onboard extends Component { 
    componentDidMount(){  
        if(!this.props.user.onboard){
            this.props.history.replace('/')
        }
    }
    done = ()=>{  
         let {user} = this.props
         user.onboard = false;  
         Api.updateUserInfo(this.props.dispatch,user)
    }
    render() {  
        if(!this.props.user.onboard){
            this.props.history.replace('/')
        }
        return (
            <div>
                <h1>How would you like to use Snipcode</h1>
                <div>
                    <span style={{padding:10,margin:5}}>personal</span>
                    <span style={{padding:10,margin:5}}>work</span>
                     <button onClick={this.done}>go to workspaces</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    user:state.user
}) 
 

export default connect(mapStateToProps)(onboard)
