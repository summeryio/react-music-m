import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'components/player/PlayerRedux'
import ReactPlayer from 'react-player'

class PublicPlayer extends Component {
    render() {
        let {currentID, songList, playing} = this.props.player

        return (
            <div id="music_audio">
                <ReactPlayer url={`https://music.163.com/song/media/outer/url?id=${currentID}.mp3`} playing={playing} />
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