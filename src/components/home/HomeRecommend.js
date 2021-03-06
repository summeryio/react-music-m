import React, { Component } from 'react'
import Home from './Home'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './HomeRedux'

import Loading from 'common/component/Loading'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

class HomeRecommend extends Component {
    constructor(props) {
        super(props)

        this.swiper = null
    }
    
    componentDidUpdate() {
        this.swiper.update()
    }
    
    componentDidMount() {
        let {getBanner, getPlayList, getAlbum} = this.props.homeAction

        getBanner()
        getPlayList()
        getAlbum()

        this.swiper = new Swiper('.swiper-container', {
            resistanceRatio: 0,
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
    
    render() {
        let {banners, playLists, albums} = this.props.home
        let typeObj = {
            1: 'player',
            10: 'album-detail',
            1000: 'playlist-detail'
        }
        console.log(banners);
        
        return (
            <Home {...{
                id: 'home',
                nav: 'recommend'
            }}>
                <div className="banner swiper-container">
                    <div className="sliderWrap swiper-wrapper">
                        {
                            banners.length
                            ? banners.map((banner, b) => {
                                let {targetId, targetType, imageUrl} = banner
                                
                                return (
                                    <Link to={`/${typeObj[targetType]}/${targetId}`} className="swiper-slide" key={targetId}>
                                        <img src={imageUrl && imageUrl + '?param=1024y400'} />
                                    </Link>
                                )
                            }) : null
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                {
                    albums.length ? (
                        <div>
                            <div className="playlist home-list">
                                <div className="title">
                                    <Link to="/playlist">
                                        <span>推荐歌单</span>
                                        <i className="icon-keyboard_arrow_right"></i>
                                    </Link>
                                </div>
                                <ul className="list">
                                    {
                                        playLists.length
                                        ? playLists.map(play => {
                                            let playCount = play.playCount > 100000 ? parseInt(play.playCount / 10000) + '万' : parseInt(play.playCount)
                                            
                                            return (
                                                <li key={play.id}>
                                                    <div className="pic">
                                                        <img src={play.picUrl + '?param=400y400'} />
                                                        <span className="count">
                                                            <i className="icon-headset"></i>
                                                            <em>{playCount}</em>
                                                        </span>
                                                        <Link to={`/playlist-detail/${play.id}`} className="mask"></Link>
                                                    </div>
                                                    <p className="desc"><Link to={`/playlist-detail/${play.id}`}>{play.name}</Link></p>
                                                </li>
                                            )
                                        }) : null
                                    }
                                </ul>
                            </div>
                            <div className="albumlist home-list">
                                <div className="title">
                                    <Link to="/album">
                                        <span>新碟上架</span>
                                        <i className="icon-keyboard_arrow_right"></i>
                                    </Link>
                                </div>
                                <ul className="list">
                                    {
                                        albums.length
                                        ? albums.map(play => {
                                            return (
                                                <li key={play.id}>
                                                    <div className="pic">
                                                        <img src={play.picUrl + '?param=400y400'} />
                                                        <Link to={`/album-detail/${play.id}`} className="mask"></Link>
                                                    </div>
                                                    <p className="desc"><Link to={`/album-detail/${play.id}`}>{play.name}</Link></p>
                                                </li>
                                            )
                                        }) : null
                                    }
                                </ul>
                            </div>
                        </div>
                    ) : <Loading full={true}/>
                }
            </Home>
        )
    }
}

export default connect(
    state => {
        let {
            home
        } = state

        return {
            home
        }
    },
    dispatch => {
        return {
            homeAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(HomeRecommend)
