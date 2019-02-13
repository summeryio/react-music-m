import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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
                                <Link to={`/player/${song.id}`} className="name">
                                    {song.name}{song.alia}
                                    <p>{info} - {song.al.name}</p>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
