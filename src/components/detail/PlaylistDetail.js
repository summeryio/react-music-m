import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './DetailRedux'

import PlayAll from 'common/component/PlayAll'
import Loading from 'common/component/Loading'
import Header from 'common/component/Header'
import SongList from 'common/component/SongList'
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
                <Header title="歌单"/>
                {
                    loaded ? (
                        <div>
                            <div className="header">
                                <div className="bg" style={{backgroundImage: `url(${playlist.coverImgUrl + '?param=400y400'})`}}></div>
                                <div className="cont">
                                    <img src={playlist.coverImgUrl + '?param=400y400'} />
                                    <div className="info">
                                        <p>{playlist.name}</p>
                                        <p>{playlist.creator.nickname}</p>
                                        <p>创建时间：{formatDateYMD(playlist.createTime)}</p>
                                    </div>
                                </div>
                                <PlayAll songs={playlist.tracks} />
                            </div>
                            <SongList songs={playlist.tracks} />
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