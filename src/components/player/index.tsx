import React, { type FC } from 'react'
import type { Track as TrackModel } from '../../models';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { IoIosPlayCircle } from 'react-icons/io';
import { FaCirclePause } from "react-icons/fa6";
import { FaVolumeLow } from 'react-icons/fa6';
import * as Slider from '@radix-ui/react-slider';
import axios from 'axios';



interface PlayerProps {
    track: TrackModel | null;
    token: string | null;
}

const PlayerComponent: FC<PlayerProps> = ({ track, token }) => {
    if (!track) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', height: '90vh', fontWeight: 'bold'}}>No track selected</div>;
    const playTrack = async () => {
        const endpoint = 'https://api.spotify.com/v1/me/player/play';
        const body = {
          offset: {
            position: 0
          },
          uris: [track.uri],
          position_ms: 0
        };
    
        try {
          await axios.put(endpoint, body, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.error('Error starting playback:', error);
        }
      };
    return (
        <div className='container'>
            <div className='current-track'>
                {track.album.images[0].url && (
                    <img src={track.album.images[0].url} alt={track.name} className='current-track-image' />
                )}
                <div className='current-track-details'>
                    <div className='current-track-details-info'>
                        <img src={track.album.images[0].url} alt={track.name} className='current-track-details-cover' />
                        <div className='current-track-details-info-group'>
                            <div className='current-track-details-name'>{track.name}</div>
                            <div className='current-track-details-artist'>{track.artists.map(artist => artist.name).join(', ')}</div>
                        </div>
                    </div>
                    <div className='controls'>
                        <MdSkipPrevious size={40} style={{ cursor: 'pointer' }} />
                        <IoIosPlayCircle size={40} style={{ cursor: 'pointer' }} onClick={playTrack} />
                        <MdSkipNext size={40} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className='volume'>
                        <FaVolumeLow size={20} />
                        <Slider.Root className='SliderRoot' defaultValue={[50]} max={100} step={1}>
                            <Slider.Track className='SliderTrack'>
                                <Slider.Range className='SliderRange' />
                            </Slider.Track>
                            <Slider.Thumb className='SliderThumb' aria-label='Volume' />
                        </Slider.Root>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PlayerComponent
