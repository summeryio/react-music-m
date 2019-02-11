import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            <div id="loading" className={this.props.full ? 'full' : ''}><i></i>加载中...</div>
        )
    }
}
