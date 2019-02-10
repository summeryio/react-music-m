import React, { Component } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import AutomaticToTop from 'common/component/AutomaticToTop'

import HomeRecommend from 'components/home/HomeRecommend'
import HomeSong from 'components/home/HomeSong'
import HomeRank from 'components/home/HomeRank'
import HomeSinger from 'components/home/HomeSinger'

import PlayList from 'components/playlist/PlayList'

export default class RouterIndex extends Component {
  render() {
    // exact: 加上这个属性，那么就只会匹配相应组件
    return (
        <Router>
            <AutomaticToTop>
                <Switch>
                    <Route path="/" exact component={HomeRecommend} ammeter/>
                    <Route path="/newsong" component={HomeSong} />
                    <Route path="/rank" component={HomeRank} />
                    <Route path="/singer" component={HomeSinger} />

                    <Route path="/playlist" component={PlayList} />
                </Switch>
            </AutomaticToTop>
        </Router>
    )
  }
}
