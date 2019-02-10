import React, { Component } from 'react'
import Home from './Home'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './HomeRedux'

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
                <ul className="list">
                    {
                        songs.length ? songs.map(song => {
                            return (
                                <li key={song.id}><a href="#">
                                    {
                                        song.artists.map((artist, a) => {
                                            return (
                                                <span key={artist.id}>{artist.name}{a === song.artists.length - 1 ? '' : '、'}</span>
                                            )
                                        })
                                    } - {song.name}
                                </a></li>
                            )
                        }) : null
                    }
                </ul>
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
