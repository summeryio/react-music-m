import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './DetailRedux'

import Loading from 'common/component/Loading'
import {formatDateYMD} from 'common/js/util'

class PlaylistDetail extends Component {
    componentDidMount() {
        let {getPlayListDetail, clearData} = this.props.detailAction
        let {id} = this.props.match.params

        clearData()
        getPlayListDetail(id)
    }
    
    render() {
        let {playListDetail} = this.props.detail
        let loaded = playListDetail.code === 200
        let playlist = loaded ? playListDetail.playlist : {}

        return (
            <div id="playlist_detail">
                <div id="header_title">
                    <i 
                        className="icon-keyboard_arrow_left"
                        onClick={() => {
                            window.history.back()
                        }}
                    ></i>
                    <p>歌单</p>
                    <Link to="/" className="icon-home"><img src={require('common/images/icon_home1.png')} /></Link>
                </div>
                {
                    loaded ? (
                        <div>
                            <div className="header">
                                <div className="bg"><i style={{backgroundImage: `url(${playlist.coverImgUrl})`}}></i></div>
                                <div className="cont">
                                    <img src={playlist.coverImgUrl + '?param=400y400'} />
                                    <div className="info">
                                        <p>{playlist.name}</p>
                                        <p>{playlist.creator.nickname}</p>
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
                                    playlist.tracks.map((song) => {
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