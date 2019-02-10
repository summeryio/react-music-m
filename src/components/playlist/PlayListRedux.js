import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    playlists: [],
    playListData: {}
}

const GET_PLSY_LIST = 'm-music/PlayListRedux/GET_PLSY_LIST'
const CLEAR_PLAYLIST = 'm-music/PlayListRedux/CLEAR_PLAYLIST'

export const getPlayList = (order, cat, nowPage) => (dispatch, getState) => {
    let {playlists} = getState().playlist
    
    axios.get(`${URL_HEADER}/top/playlist?limit=30&order=${order}&cat=${encodeURI(cat)}&offset=${(nowPage - 1) * 30}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLSY_LIST,
                playListData: res.data,
                playlists: playlists.concat(res.data.playlists)
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const clearPlaylist = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_PLAYLIST,
        playlists: []
    })
}


export default function playlist(state = initialState, action) {
    let {
        type,
        playListData,
        playlists
    } = action


    switch (type) {
        case GET_PLSY_LIST:
            return {...state, playListData, playlists}
            break
        case CLEAR_PLAYLIST:
            return {...state, playlists}
            break

        default:
            return state
    }
}