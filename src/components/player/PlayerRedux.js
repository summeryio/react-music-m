import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    currentID: null,
    songDetail: {},
    songList: [],
    playing: true
}

const GET_SONG_ID = 'm-music/PlayerRedux/GET_SONG_ID'
const GET_SONG_DETAIL = 'm-music/PlayerRedux/GET_SONG_DETAIL'
const GET_SONG_LIST = 'm-music/PlayerRedux/GET_SONG_LIST'
const SET_PLAYING = 'm-music/PlayerRedux/SET_PLAYING'


export const getSongID = (id) => (dispatch, getState) => {
    dispatch({
        type: GET_SONG_ID,
        currentID: parseInt(id)
    })

    dispatch(getSongDetail(id))
}

export const getSongDetail = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/song/detail?ids=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_SONG_DETAIL,
                songDetail: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getSongList = (songs) => (dispatch, getState) => {
    dispatch({
        type: GET_SONG_LIST,
        songList: songs
    })

    dispatch(setPlaying(true))
}

export const setPlaying = (status) => (dispatch, getState) => {
    dispatch({
        type: SET_PLAYING,
        playing: status
    })
}


export default function player(state = initialState, action) {
    let {
        type,
        currentID,
        songDetail,
        songList,
        playing
    } = action


    switch (type) {
        case GET_SONG_ID:
            return {...state, currentID}
            break
        case GET_SONG_DETAIL:
            return {...state, songDetail}
            break
        case GET_SONG_LIST:
            return {...state, songList}
            break
        case SET_PLAYING:
            return {...state, playing}
            break

        default:
            return state
    }
}