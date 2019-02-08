import React, { Component } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

export default class RouterIndex extends Component {
  render() {
    // exact: 加上这个属性，那么就只会匹配相应组件
    return (
        <Router>
            <AutomaticToTop>
                <Switch>
                    {/* <Route path="/" exact component={Home} ammeter/> */}
                </Switch>
            </AutomaticToTop>
        </Router>
    )
  }
}
