import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    currentID: null,
    songDetail: {},
    songList: [],
    playing: false,
    playerObj: {}
}

const GET_SONG_ID = 'm-music/player/PlayerRedux/GET_SONG_ID'
const GET_SONG_DETAIL = 'm-music/player/PlayerRedux/GET_SONG_DETAIL'
const GET_SONG_LIST = 'm-music/player/PlayerRedux/GET_SONG_LIST'
const SET_PLAYING = 'm-music/player/PlayerRedux/SET_PLAYING'
const GET_PLAYER_OBJ = 'm-music/player/PlayerRedux/GET_PLAYER_OBJ'


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
}

export const setPlaying = (status) => (dispatch, getState) => {
    dispatch({
        type: SET_PLAYING,
        playing: status
    })
}

export const getPlayerObj = (player) => (dispatch, getState) => {
    dispatch({
        type: GET_PLAYER_OBJ,
        playerObj: player
    })
}


export default function player(state = initialState, action) {
    let {
        type,
        currentID,
        songDetail,
        songList,
        playing,
        playerObj
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
        case GET_PLAYER_OBJ:
            return {...state, playerObj}
            break

        default:
            return state
    }
}