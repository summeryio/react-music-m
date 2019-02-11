import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Home from './Home'

export default class HomeSinger extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let singerObj = {
            5001: '入驻歌手',
            1001: '华语男歌手',
            1002: '华语女歌手',
            1003: '华语组合/乐队',
            2001: '欧美男歌手',
            2002: '欧美女歌手',
            2003: '欧美组合/乐队',
            6001: '日本男歌手',
            6002: '日本女歌手',
            6003: '日本组合/乐队',
            7001: '韩国男歌手',
            7002: '韩国女歌手',
            7003: '韩国组合/乐队',
            4001: '其他男歌手',
            4002: '其他女歌手',
            4003: '其他组合/乐队'
        }
        
        return (
            <Home {...{
                id: 'singer',
                nav: 'singer'
            }}>
                <ul className="category">
                    {
                        Object.keys(singerObj).map((key) => {
                            let val = singerObj[key]
                            key = parseInt(key)
                            let mb = (key === 5001 || key === 1003 || key === 2003 ||  key === 6003 ||  key === 7003 ||  key === 4003) ? 'mb' : '' 
                            
                            return (
                                <li key={key} className={mb}>
                                    <Link 
                                        to={{
                                            pathname: `/singer-list/${key}`, 
                                            query: {title: val}
                                        }}>
                                        <span>{val}</span>
                                        <i className="icon-keyboard_arrow_right"></i>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Home>
        )
    }
}
