import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import RouterIndex from 'router/RouterIndex'

export default class App extends Component {
    render() {
        return (
            <div><h1>Hello World!</h1></div>
        )
    }
}