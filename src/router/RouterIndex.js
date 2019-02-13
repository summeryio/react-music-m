import React, { Component } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'


import PublicPlayer from 'common/component/PublicPlayer'
import AutomaticToTop from 'common/component/AutomaticToTop'

import HomeRecommend from 'components/home/HomeRecommend'
import HomeSong from 'components/home/HomeSong'
import HomeRank from 'components/home/HomeRank'
import HomeSinger from 'components/home/HomeSinger'

import PlayList from 'components/playlist/PlayList'
import Album from 'components/album/Album'

import PlaylistDetail from 'components/detail/PlaylistDetail'
import AlbumDetail from 'components/detail/AlbumDetail'

import SingerList from 'components/singer/SingerList'
import SingerDetail from 'components/singer/SingerDetail'

import Player from 'components/player/Player'

export default class RouterIndex extends Component {
  render() {
    // exact: 加上这个属性，那么就只会匹配相应组件
    return (
      <div className="app">
        <PublicPlayer />
        <Router>
            <AutomaticToTop>
                <Switch>
                    <Route path="/" exact component={HomeRecommend} ammeter/>
                    <Route path="/newsong" component={HomeSong} />
                    <Route path="/rank" component={HomeRank} />
                    <Route path="/singer" component={HomeSinger} />

                    <Route path="/playlist" component={PlayList} />
                    <Route path="/album" component={Album} />

                    <Route path="/playlist-detail/:id" component={PlaylistDetail} />
                    <Route path="/album-detail/:id" component={AlbumDetail} />

                    <Route path="/singer-list/:id" component={SingerList} />
                    <Route path="/singer-detail/:id" component={SingerDetail} />

                    <Route path="/player/:id" component={Player} />
                </Switch>
            </AutomaticToTop>
        </Router>
      </div>
    )
  }
}
