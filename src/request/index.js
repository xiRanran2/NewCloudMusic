// 所有的请求都定义在这个位置
import axios from 'axios';
const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
});
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