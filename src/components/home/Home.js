import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    render() {
        let {id, nav, children} = this.props
        
        return (
            <div id={id}>
                <div id="home_header"></div>
                <ul id="home_nav">
                    <li className={nav === 'recommend' ? 'active' : ''}><Link to="/">个性推荐</Link></li>
                    <li className={nav === 'song' ? 'active' : ''}><Link to="/newsong">新歌</Link></li>
                    <li className={nav === 'rank' ? 'active' : ''}><Link to="/rank">排行榜</Link></li>
                    <li className={nav === 'singer' ? 'active' : ''}><Link to="/singer">歌手</Link></li>
                </ul>
                {children}
            </div>
        )
    }
}
