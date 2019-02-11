import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './DetailRedux'
import Header from 'common/component/Header'

import {formatDateYMD} from 'common/js/util'

class AlbumDetail extends Component {
    componentDidMount() {
        let {getAlbumDetail} = this.props.detailAction
        let {id} = this.props.match.params

        getAlbumDetail(id)
    }
    
    render() {
        let {albumDetailData} = this.props.detail
        let loaded = albumDetailData.code === 200
        let album = loaded ? albumDetailData.album : {}

        return (
            <div id="playlist_detail">
                <Header title="专辑" />
                <div className="header">
                    <div className="bg" style={{backgroundImage: loaded && `url(${album.picUrl})`}}></div>
                    <div className="cont">
                        <img src={album.picUrl && album.picUrl + '?param=400y400'} />
                        <div className="info">
                            <p>{album.name}</p>
                            <p>创建时间：{formatDateYMD(album.createTime)}</p>
                            <p>发行公司：{loaded ? album.company : null}</p>
                        </div>
                    </div>
                    <div className="play">
                        <span>播放全部</span>
                        <i className="icon-playlist_add"></i>
                    </div>
                </div>
                <ul className="song-list">
                    {
                        loaded ? albumDetailData.songs.map(song => {
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
)(AlbumDetail)