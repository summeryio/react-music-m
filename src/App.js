import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import RouterIndex from 'router/RouterIndex'

export default class App extends Component {
    render() {
        return (
            <RouterIndex></RouterIndex>
        )
    }
}