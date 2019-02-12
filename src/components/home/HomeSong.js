import React, { Component } from 'react'
import Home from './Home'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './HomeRedux'

import Loading from 'common/component/Loading'

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
                {
                    songs.length ? (
                        <ul className="song-list">
                            {
                                songs.map(song => {
                                    return (
                                        <li key={song.id}><a href="#">
                                            {
                                                song.ar.map((artist, a) => {
                                                    return (
                                                        <span key={artist.id + a}>{artist.name}{a === song.ar.length - 1 ? '' : '、'}</span>
                                                    )
                                                })
                                            } - {song.name}
                                        </a>{song.alia.length ? <p>{song.alia}</p> : null}</li>
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
)(HomeSong)
