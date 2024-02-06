import React from 'react'
import './style.scss';

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Upcoming from './upcoming/Upcoming';
import TopRated from './topRated/TopRated';
import NowPlaying from './nowPlaying/NowPlaying';



const home = () => {
  return (
    <div className='homePage'>  {/*ana sayfada sırasıyla gösterilecek componentler*/}
      <HeroBanner/>
      <Trending/>
      <Upcoming/>
      <TopRated/>
      <NowPlaying/>
    </div>
  )
}

export default home