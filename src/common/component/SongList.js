import React, { Component } from 'react'

export default class SongList extends Component {
    render() {
        let {songs} = this.props

        return (
            <ul className="song-list">
                {
                    songs.map((song) => {
                        let info = song.ar.map((artist, a) => {
                            return `${artist.name}${a === song.ar.length - 1 ? '' : '/'}`
                        })
                        
                        return (
                            <li key={song.id}>
                                <a href="#" className="name">{song.name}{song.alia}</a>
                                <p>{info} - {song.al.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
