import React, { Component } from 'react'
import Home from './Home'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './HomeRedux'

import Loading from 'common/component/Loading'
import SongList from 'common/component/SongList'

class HomeSong extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        let {getSong} = this.props.homeAction

        getSong()
    }
    
    render() {
        let {songs} = this.props.home

        return (
            <Home {...{
                id: 'new_song',
                nav: 'song'
            }}>
                {songs.length ? <SongList songs={songs} /> : <Loading full={true}/>}
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
)(HomeSong)
