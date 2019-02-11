import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './DetailRedux'
import Header from 'common/component/Header'

import {formatDateYMD} from 'common/js/util'

class PlaylistDetail extends Component {
    componentDidMount() {
        let {getPlayListDetail} = this.props.detailAction
        let {id} = this.props.match.params

        getPlayListDetail(id)
    }
    
    render() {
        let {playListDetail} = this.props.detail
        let loaded = playListDetail.code === 200
        let playlist = loaded ? playListDetail.playlist : {}

        return (
            <div id="playlist_detail">
                <Header title="歌单" />
                <div className="header">
                    <div className="bg" style={{backgroundImage: loaded && `url(${playlist.coverImgUrl})`}}></div>
                    <div className="cont">
                        <img src={playlist.coverImgUrl && playlist.coverImgUrl + '?param=400y400'} />
                        <div className="info">
                            <p>{playlist.name}</p>
                            <p>{loaded ? playlist.creator.nickname : null}</p>
                            <p>创建时间：{formatDateYMD(playlist.createTime)}</p>
                        </div>
                    </div>
                    <div className="play">
                        <span>播放全部</span>
                        <i className="icon-playlist_add"></i>
                    </div>
                </div>
                <ul className="song-list">
                    {
                        loaded ? playlist.tracks.map(song => {
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
                        }) : null
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => {
        let {
            detail
        } = state

        return {
            detail
        }
    },
    dispatch => {
        return {
            detailAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(PlaylistDetail)