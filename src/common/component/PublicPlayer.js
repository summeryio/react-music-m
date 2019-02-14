import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'components/player/PlayerRedux'
import ReactPlayer from 'react-player'

class PublicPlayer extends Component {
    constructor(props) {
        super(props)
        
        this.musicEnded = this.musicEnded.bind(this)
    }
    
    musicEnded() {
        let {songList, currentID} = this.props.player
        let {getSongID, setPlaying, getSongDetail} = this.props.playerAction
        let index = 0
        
        if (songList.length && songList.length > 1) {
            songList.forEach((song, i) => {
                if (currentID === song.id) {
                    index = i
                }
            })
        } else {
            return
        }

        let curIndex = index + 1 > songList.length - 1 ? 0 : ++index
        getSongID(songList[curIndex].id)
        setPlaying(true)
        getSongDetail(songList[curIndex].id)
    }

    componentDidMount() {
        let {player} = this.player
        
        this.props.playerAction.getPlayerObj(player)
    }
    
    render() {
        let {currentID, playing} = this.props.player

        return (
            <div id="music_audio">
                <ReactPlayer url={`https://music.163.com/song/media/outer/url?id=${currentID}.mp3`} playing={playing} onEnded={this.musicEnded} ref={player => {
                    this.player = player
                }}/>
            </div>
        )
    }
}

export default connect(
    state => {
        let {
            player
        } = state

        return {
            player
        }
    },
    dispatch => {
        return {
            playerAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(PublicPlayer)