import * as React from 'react';
import fakeData from '../../../../server/db/fakeData.json';

type Reel = {
  id: number;
  video: string;
  user_id: number;
  event_id: number;
  text: string;
  like_count: number;
};

const Reel = () => {
  return (
    <div className='reel-container'>
      {fakeData?.map((reel: Reel): any => {
         return (<div className='video'>
            <p className='user-text'>{reel.text}</p>
          </div>)
      })}
    </div>
  );
};

export default Reel;
