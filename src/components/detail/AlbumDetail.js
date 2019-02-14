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
                <Header title="专辑"/>
                {
                    loaded ? (
                        <div>
                            <div className="header">
                                <div className="bg" style={{backgroundImage: `url(${album.picUrl})`}}></div>
                                <div className="cont">
                                    <img src={album.picUrl + '?param=400y400'} />
                                    <div className="info">
                                        <p>{album.name}</p>
                                        <p>创建时间：{formatDateYMD(album.createTime)}</p>
                                        {album.company ? <p>发行公司：{album.company}</p> : null}
                                    </div>
                                </div>
                                <PlayAll songs={albumDetailData.songs} />
                            </div>
                            <SongList songs={albumDetailData.songs} />
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