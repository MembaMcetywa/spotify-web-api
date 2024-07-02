import React, { type FC } from 'react'
import { IoIosPlayCircle } from "react-icons/io";
import type { Track as TrackModel } from '../../models';


interface TrackProps {
  track: TrackModel;
  onPlay: () => void;
}

const Track: FC<TrackProps> = ({ track, onPlay }) => {
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
      <IoIosPlayCircle  size={40} style={{cursor: 'pointer'}} onClick={onPlay} />
      </div>
    </div>
  );
};

export default Track;