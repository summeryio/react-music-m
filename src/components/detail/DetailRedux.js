import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    playListDetail: {},
    albumDetailData: {}
}

const GET_PLAY_DETAIL = 'm-music/PlaylistDetail/GET_PLAY_DETAIL'
const GET_ALBUM_DETAIL = 'm-music/PlaylistDetail/GET_ALBUM_DETAIL'
const CLEAR_DATA = 'm-music/PlaylistDetail/CLEAR_DATA'


export const getPlayListDetail = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/playlist/detail?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLAY_DETAIL,
                playListDetail: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getAlbumDetail = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/album?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM_DETAIL,
                albumDetailData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_DATA,
        playListDetail: {},
        albumDetailData: {}
    })
}


export default function detail(state = initialState, action) {
    let {
        type,
        playListDetail,
        albumDetailData
    } = action


    switch (type) {
        case GET_PLAY_DETAIL:
            return {...state, playListDetail}
            break
        case GET_ALBUM_DETAIL:
            return {...state, albumDetailData}
            break
        case CLEAR_DATA:
            return {...state, playListDetail, albumDetailData}
            break

        default:
            return state
    }
}