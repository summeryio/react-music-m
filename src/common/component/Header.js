import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import creatHistory from 'history/createHashHistory' 

const history = creatHistory()

export default class Header extends Component {
    render() {
        let {title} = this.props
        
        return (
            <div id="header_title">
                <i 
                    className="icon-keyboard_arrow_left"
                    onClick={() => {
                        history.goBack()
                    }}
                ></i>
                <p>{title}</p>
                <Link to="/" className="icon-home"><img src={require('common/images/icon_home.png')} /></Link>
            </div>
        )
    }
}