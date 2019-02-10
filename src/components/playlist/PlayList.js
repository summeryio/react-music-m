import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PlayListRedux'
import Header from 'common/component/Header'

import Loading from 'common/component/Loading'

class PlayList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 1,
            finished: false,//是否全部加载完毕
            isFoot: true,   //阻止用户频繁上拉调接口
        }
    }
    
    //接触屏幕
    touchStart(e) {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
    }
    //离开屏幕（[e.changedTouches][2]）
    touchEnd(e) {
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = this.getDirection(this.startx, this.starty, endx, endy);
        switch (direction) {
            case 0:
                // console.log("未滑动！");
                break;
            case 1:
                // console.log("向上！");
                this.loadData();
                break;
            case 2:
                // console.log("向下！");
                break;
            case 3:
                // console.log("向左！");
                break;
            case 4:
                // console.log("向右！");
                break;
            default:
        }
    }
    //触摸点和离开点连线与[x轴角度][3]
    getAngle(angx,angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    }
    //根据接触和离开判断方向 1向上 2向下 3向左 4向右 0未发生滑动（[Math.abs][4]）
    getDirection(startx, starty, endx, endy) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;

        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
        let angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }

        return result;
    }

    loadData() {
        let {getPlayList} = this.props.playlistAction

        // console.log("数据的高---------", this.refs.onPullUp.clientHeight);
        // console.log("滚动的高---------", document.documentElement.scrollTop);
        // console.log("滚动的高---------", document.body.scrollTop);
        // console.log("屏幕的高---------", document.documentElement.clientHeight);
        let dataHeight = this.refs.onPullUp.clientHeight;
        let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
        let screenHeight = document.documentElement.clientHeight;
        const h = 150;//自定义距离底部多少时concat数据
        if (dataHeight - scrollHeight - h < screenHeight && this.state.isFoot) {
            this.setState({
                isFoot: false,
                page: this.state.page + 1
            }, () => {
                getPlayList('hot', '全部', this.state.page)
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let {playListData, playlists} = this.props.playlist
        let more = playListData.more || true 

        if (!more) {
            this.setState({finished: true})
        }

        if (playlists.length !== nextProps.playlist.playlists.length) {
            this.setState({
                isFoot: true
            })
        }
    }
    
    componentDidMount() {
        let {clearPlaylist, getPlayList} = this.props.playlistAction

        clearPlaylist()
        getPlayList('hot', '全部', this.state.page)
    }
    
    render() {
        let {playListData, playlists} = this.props.playlist
        let loaded = playListData.code === 200
        let {finished, isFoot} = this.state

        return (
            <div id="playlist">
                <Header />
                <div className="scroll_wrapper" ref="onPullUp" onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)}>
                    <ul className="list">
                        {
                            loaded
                            ? playlists.map((play, i) => {
                                let playCount = play.playCount > 100000 ? parseInt(play.playCount / 10000) + '万' : parseInt(play.playCount)
                                
                                return (
                                    <li key={play.id}>
                                        <div className="pic">
                                            <img src={play.coverImgUrl + '?param=400y400'} />
                                            <span className="count">
                                                <i className="icon-headset"></i>
                                                <em>{playCount}</em>
                                            </span>
                                            <a href="#" className="mask"></a>
                                        </div>
                                        <p className="desc">{play.name}</p>
                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                    {playlists.length && isFoot ? <p className="scroll-tip">上拉加载更多</p> : <Loading />}
                    {finished ? <p className="scroll-tip">我是有底线的</p> : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        let {
            playlist
        } = state

        return {
            playlist
        }
    },
    dispatch => {
        return {
            playlistAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(PlayList)