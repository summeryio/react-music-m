import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    albums: [],
    albumData: {},
    artistData: {},
}

const GET_ALBUM_DATA = 'm-music/SingerRedux/GET_ALBUM_DATA'
const CLEAR_PLAYLIST = 'm-music/SingerRedux/CLEAR_PLAYLIST'
const GET_ARTIST_DATA = 'm-music/SingerRedux/GET_ARTIST_DATA'

export const getAlbumData = (id, page) => (dispatch, getState) => {
    let {albums} = getState().singer

    axios.get(`${URL_HEADER}/artist/list?cat=${id}&offset=${(page - 1) * 20}&limit=20`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM_DATA,
                albumData: res.data,
                albums: albums.concat(res.data.artists)
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

export const getArtistData = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/artists?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ARTIST_DATA,
                artistData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function singer(state = initialState, action) {
    let {
        type,
        albumData,
        albums,
        artistData
    } = action


    switch (type) {
        case GET_ALBUM_DATA:
            return {...state, albumData, albums}
            break
        case CLEAR_PLAYLIST:
            return {...state, albums}
            break
        case GET_ARTIST_DATA:
            return {...state, artistData}
            break

        default:
            return state
    }
}