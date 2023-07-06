// 所有的请求都定义在这个位置
import axios from 'axios';
import store from 'storejs'
const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
});

//添加请求拦截器
http.interceptors.request.use(function(config){
  const cookie = store.get('__m__cookie') ?? "";
  config.params = config.params || {};
  config.params.cookie = cookie;
  return config;
})

export const fetchPlaylistHot = () => http.get('/playlist/hot');
export const fetchPlaylists = (cat) =>
  http.get('/top/playlist', { params: { cat } });

//获取默认搜索关键词
/**
 * @description  获取默认搜索关键词
 * @param  {Array} xxx
 * @returns {Promise} xxx
 */
//搜索框
export const fetchSearchDefault = () => http.get('/search/default');
export const fetchSearchResult = (params) =>
  http.get('/search', { params });
export const fetchSearchSuggest = (keywords) => http.get('/search/suggest',{params:{keywords}})

//每日推荐
export const DailyRecommened = () => http.get('/homepage/dragon/ball')
//推荐歌单
export const Personalized = () => http.get('/personalized')

// 轮播图  新歌新碟\数字专辑 排行榜
export const Banners = () => http.get('/homepage/block/page')

//热门话题
export const HotTopics = () => http.get('/hot/topic')
//日历
// export const Canlanders = () => http.get('/calendar?startTime=1687836243619&endTime=1687922643618')

// 音乐日历
let nowDate = new Date();
let start = new Date(
  `${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1
  }-${nowDate.getDate()} 00:00:00`
);
let end = new Date(
  `${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1
  }-${nowDate.getDate()} 23:59:59`
);
export const Calendar = () =>
  http.get(`/calendar?startTime=${start.getTime()}&endTime=${end.getTime()}`);


export const GuessLike = () => http.get('/search/hot/detail')
// export const TopListDetail = () => http.get('/playlist/detail')

// export const Lists = () => http.get('/toplist/detail')

//歌单详情头部
export const songDetails = (params) => http.get(`/playlist/detail?id=${params}`)

//歌单详情 列表
export const playlistTracks = (params) => http.get(`/playlist/track/all?id=${params}`)

//二维码 key 生成接口
export const getQrKey = () => http.get('/login/qr/key');

//二维码生成接口
export const getQrInfo = (key,qrimg=1) =>
  http.get('/login/qr/create', { params: { key,qrimg } });

//二维码检测扫码状态接口
export const checkQrStatus = (key) => http.get('/login/qr/check',{params:{key,timestamp:Date.now()}})

//
// export const getUserAccount = () => http.get('/user/account')

// export const getUserDetail = (uid) => http.get('/user/detail',{params:{uid}})

// 获取账号信息
export const getUserAccount = () => http.get('/user/account');
// 用户详情
export const getUserDetail = (uid) => http.get('/user/detail',{params:{uid}});

export const musicSlider = (params) => http.get(`related/playlist?id=${params}`)