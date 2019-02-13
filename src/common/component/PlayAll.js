import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'components/player/PlayerRedux'

class PlayAll extends Component {
    render() {
        let {songs} = this.props
        let {getSongList} = this.props.playerAction
        
        return (
            <div className="play">
                <span>播放全部</span>
                <Link to={`/player/${songs[0].id}`}><i className="icon-playlist_add" onClick={ev => getSongList(songs)}></i></Link>
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
)(PlayAll)