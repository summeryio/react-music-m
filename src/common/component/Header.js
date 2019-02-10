import React, { Component } from 'react'
import creatHistory from 'history/createHashHistory' 

const history = creatHistory()

export default class Header extends Component {
    render() {
        return (
            <div id="header">
                <i 
                    className="icon-keyboard_arrow_left"
                    onClick={() => {
                        history.goBack()
                    }}
                ></i>
                <p>精选歌单</p>
            </div>
        )
    }
}