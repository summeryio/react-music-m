import React, { Component } from 'react'
import Home from './Home'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './HomeRedux'

import Loading from 'common/component/Loading'

class HomeRank extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        let {getRank} = this.props.homeAction

        getRank()
    }
    
    render() {
        let {ranks} = this.props.home

        return (
            <Home {...{
                id: 'rank',
                nav: 'rank'
            }}>
                {
                    ranks.length ? (
                        <ul className="list">
                        {
                            ranks.map(rank => {
                                return (
                                    <li key={rank.id}><Link to={`/playlist-detail/${rank.id}`}>
                                        <img src={rank.coverImgUrl + '?param=400y400'} />
                                        <p>{rank.name}</p>
                                        <i className="icon-keyboard_arrow_right"></i>
                                    </Link></li>
                                )
                            })
                        }
                    </ul>
                    ) : <Loading full={true}/>
                }
            </Home>
        )
    }
}

export default connect(
    state => {
        let {
            home
        } = state

        return {
            home
        }
    },
    dispatch => {
        return {
            homeAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(HomeRank)
