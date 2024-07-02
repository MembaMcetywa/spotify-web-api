import React, { FC } from 'react'
import { IoIosPlayCircle } from "react-icons/io";
import { Track as TrackModel } from '../../models';


interface TrackProps {
  track: TrackModel;
}

const Track: FC<TrackProps> = ({ track }) => {
  return (
    <div key={track.id} className="track">
      <div className='track-info'>
      <img className='track-cover' src={track.album.images[0].url} alt={track.name} />
      <div>
        <div className='track-name'>{track.name}</div>
        <div className='track-artist' >{track.artists.map(artist => artist.name).join(', ')}</div>
      </div>
      </div>
      <div className='track-actions'>
      <IoIosPlayCircle color='#1DB954' size={40} />
      </div>
    </div>
  );
};

export default Track;