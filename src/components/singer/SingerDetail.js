import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './SingerRedux'
import Header from 'common/component/Header'

import Loading from 'common/component/Loading'

class SingerDetail extends Component {
    componentDidMount() {
        let {getArtistData, clearArtistData} = this.props.singerAction
        let {id} = this.props.match.params

        clearArtistData()
        getArtistData(id)
    }
    
    render() {
        let {artistData} = this.props.singer
        let loaded = artistData.code === 200
        let hotSongs = loaded ? artistData.hotSongs : []
        let artist = loaded ? artistData.artist : {}

        return (
            <div id="singer_detail">
                <Header title={artist.name} />
                {
                    loaded ? (
                        <div>
                            <div className="header">
                            <div className="cont"><img src={artist.picUrl + '?param=1024y520'} /></div>
                            <div className="play">
                                <span>播放全部</span>
                                <i className="icon-playlist_add"></i>
                            </div>
                        </div>
                        <ul className="song-list">
                            {
                                hotSongs.map(song => {
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
                        </div>
                    ) : <Loading full={true}/>
                }
                
            </div>
        )
    }
}

export default connect(
    state => {
        let {
            singer
        } = state

        return {
            singer
        }
    },
    dispatch => {
        return {
            singerAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(SingerDetail)