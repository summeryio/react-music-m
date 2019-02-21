import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    albums: [],
    albumData: {}
}

const GET_ALBUM_DATA = 'm-music/album/AlbumRedux/GET_ALBUM_DATA'
const CLEAR_PLAYLIST = 'm-music/album/AlbumRedux/CLEAR_PLAYLIST'

export const getAlbumData = (page) => (dispatch, getState) => {
    let {albums} = getState().album

    axios.get(`${URL_HEADER}/top/album?offset=${(page - 1) * 30}&limit=30`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM_DATA,
                albumData: res.data,
                albums: albums.concat(res.data.albums)
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const clearPlaylist = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_PLAYLIST,
        albums: []
    })
}


export default function album(state = initialState, action) {
    let {
        type,
        albumData,
        albums
    } = action


    switch (type) {
        case GET_ALBUM_DATA:
            return {...state, albumData, albums}
            break
        case CLEAR_PLAYLIST:
            return {...state, albums}
            break

        default:
            return state
    }
}