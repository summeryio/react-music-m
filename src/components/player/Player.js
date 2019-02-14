import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PlayerRedux'

class Player extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            playing: true
        }
        
        this.playPrev = this.playPrev.bind(this)
        this.playNext = this.playNext.bind(this)
    }
    
    playPrev() {
        let {songList, currentID} = this.props.player
        let {getSongID, setPlaying} = this.props.playerAction
        let index = 0
        
        if (songList.length && songList.length > 1) {
            songList.forEach((song, i) => {
                if (currentID === song.id) {
                    index = i
                }
            })
        } else { // 这里，在点击歌曲下拉列表时，数组为空，就获取不到数据路，所以一首歌时，也要获取数据进去
            return
        }

        let curIndex = index - 1 < 0 ? songList.length - 1 : --index
        getSongID(songList[curIndex].id)
        setPlaying(true)
        this.props.history.push(`/player/${songList[curIndex].id}`);
    }
    
    playNext() {
        let {songList, currentID} = this.props.player
        let {getSongID, setPlaying} = this.props.playerAction
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
        this.props.history.push(`/player/${songList[curIndex].id}`);
    }

    /* componentWillReceiveProps(nextProps) {
        let {player} = nextProps.player.playerObj

        if (nextProps.player.currentID) {
            document.addEventListener('DOMContentLoaded', function () {
                function audioAutoPlay() {
                    player.player.play();
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        player.player.play();
                    }, false);
                }
                audioAutoPlay();
            })
        }
    } */
    
    componentDidMount() {
        let {id} = this.props.match.params
        let {getSongID, setPlaying} = this.props.playerAction

        getSongID(id)
        setPlaying(true)
    }
    
    render() {
        let {songDetail, playing} = this.props.player
        let loaded = songDetail.code === 200
        let song = loaded ? songDetail.songs[0] : {}
        let songAl = loaded ? song.al : {}

        return (
            <div id="music_player">
                <div className="bg" style={{backgroundImage: `url(${songAl.picUrl && songAl.picUrl + '?param=400y400'})`}}></div>
                <div className="home"><Link to="/"><img src={require('common/images/icon_home.png')} /></Link></div>
                <div className="play">
                    <div className="play-border">
                        <div className={`play-pic ${playing ? '' : 'paused'}`}>
                            <div className="wrapper">
                                <img src={songAl.picUrl && songAl.picUrl + '?param=400y400'} />
                            </div>
                        </div>
                        <div className="play-light"></div>
                    </div>
                </div>
                <div className="info">
                    <h4>{song.name}</h4>
                    <p>- {
                        loaded && song.ar.map((artist, a) => {
                            return `${artist.name}${a === song.ar.length - 1 ? '' : '/'}`
                        })
                    } -</p>
                </div>
                <div className="operation">
                    <i className="icon-prev"
                        onClick={this.playPrev}
                    ></i>
                    <i className={playing ? 'icon-pause' : 'icon-play'}
                        onClick={ev => this.props.playerAction.setPlaying(!playing)}
                    ></i>
                    <i className="icon-next"
                        onClick={this.playNext}
                    ></i>
                    {/* <i className="icon-list"></i> */}
                </div>
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
)(Player)
