import React, { Component } from 'react'
import creatHistory from 'history/createHashHistory' 

const history = creatHistory()

export default class Header extends Component {
    render() {
        let {title} = this.props
        
        return (
            <div id="header">
                <i 
                    className="icon-keyboard_arrow_left"
                    onClick={() => {
                        history.goBack()
                    }}
                ></i>
                <p>{title}</p>
            </div>
        )
    }
}