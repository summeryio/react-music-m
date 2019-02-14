import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './SingerRedux'

import PlayAll from 'common/component/PlayAll'
import Header from 'common/component/Header'
import Loading from 'common/component/Loading'
import SongList from 'common/component/SongList'


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
                                <PlayAll songs={artistData.hotSongs} />
                            </div>
                            <SongList songs={hotSongs} />
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