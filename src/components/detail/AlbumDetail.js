import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './DetailRedux'
import Header from 'common/component/Header'

import Loading from 'common/component/Loading'
import {formatDateYMD} from 'common/js/util'

class AlbumDetail extends Component {
    componentDidMount() {
        let {getAlbumDetail, clearData} = this.props.detailAction
        let {id} = this.props.match.params

        clearData()
        getAlbumDetail(id)
    }
    
    render() {
        let {albumDetailData} = this.props.detail
        let loaded = albumDetailData.code === 200
        let album = loaded ? albumDetailData.album : {}

        return (
            <div id="album_detail">
                <Header title="专辑" />
                {
                    loaded ? (
                        <div>
                            <div className="header">
                                <div className="bg"><i style={{backgroundImage: `url(${album.picUrl})`}}></i></div>
                                <div className="cont">
                                    <img src={album.picUrl + '?param=400y400'} />
                                    <div className="info">
                                        <p>{album.name}</p>
                                        <p>创建时间：{formatDateYMD(album.createTime)}</p>
                                        {album.company ? <p>发行公司：{album.company}</p> : null}
                                    </div>
                                </div>
                                <div className="play">
                                    <span>播放全部</span>
                                    <i className="icon-playlist_add"></i>
                                </div>
                            </div>
                            <ul className="song-list">
                                {
                                    albumDetailData.songs.map(song => {
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
)(AlbumDetail)