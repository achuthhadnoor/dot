import React, { Component } from 'react'
import { connect } from 'react-redux'

export class settings extends Component {
    render() {
        return (
            <div>
                Settings 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(settings)
