import React, { useCallback, useEffect, useState, type FC } from "react";
import type { Track as TrackModel } from "../../models";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { FaVolumeXmark, FaVolumeHigh } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import * as Slider from "@radix-ui/react-slider";
import axios from "axios";
import { debounce } from 'lodash';

interface PlayerProps {
	track: TrackModel | null;
	token: string | null;
}

const PlayerComponent: FC<PlayerProps> = ({ track, token }) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [playbackInfo, setPlaybackInfo] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(50);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchPlaybackStatus = async () => {
			try {
				const response = await axios.get(
					"https://api.spotify.com/v1/me/player",
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				setPlaybackInfo(response.data);
			} catch (error) {
				console.error("Error fetching playback status:", error);
				setPlaybackInfo(null);
			}
		};
		fetchPlaybackStatus();
	}, [playbackInfo, track, token]);

	const playTrack = async () => {
		if (!track) return;
		const endpoint = "https://api.spotify.com/v1/me/player/play";
		const body = {
			offset: {
				position: 0,
			},
			uris: [track.uri],
			position_ms: 0,
		};

		try {
			await axios.put(endpoint, body, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.error("Error starting playback:", error);
			if (error.message === "Request failed with status code 404") {
				window.alert("Play something on your Spotify app then try again :)");
			}
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const setSpotifyVolume = useCallback(debounce((volume: number) => {
        if (!token) return;
        const endpoint = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`;
        axios.put(endpoint, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error('Error setting volume:', error);
        });
    }, 500), [token]); 

	const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        setSpotifyVolume(newVolume);
    };

	useEffect(() => {
		console.log('volume', volume)
	}, [volume])

	return (
		<>
			{!track ? (
				<div
				className='no-track-container'
				>
				No track selected
				</div>
			) : (
				<div className="container">
					<div className="current-track">
						{track.album.images[0].url && (
							<img
								src={track.album.images[0].url}
								alt={track.name}
								className="current-track-image"
							/>
						)}
						<div className="current-track-details">
							<div className="current-track-details-info">
								<img
									src={track.album.images[0].url}
									alt={track.name}
									className="current-track-details-cover"
								/>
								<div className="current-track-details-info-group">
									<div className="current-track-details-name">{track.name}</div>
									<div className="current-track-details-artist">
										{track.artists.map((artist) => artist.name).join(", ")}
									</div>
								</div>
							</div>
							<div className="controls">
								<MdSkipPrevious size={40} style={{ cursor: "pointer" }} />
								{track && playbackInfo.is_playing ? (
									<FaCirclePause size={40} style={{ cursor: "pointer" }} />
								) : (
									<FaCirclePlay
										size={40}
										style={{ cursor: "pointer" }}
										onClick={playTrack}
									/>
								)}
								<MdSkipNext size={40} style={{ cursor: "pointer" }} />
							</div>
							<div className="volume">
								{volume > 0 ? (
									<FaVolumeHigh size={20} />
								) : (
									<FaVolumeXmark size={20} />
								)}
								<Slider.Root
									className="SliderRoot"
									defaultValue={[volume]}
									onValueChange={handleVolumeChange} 
									max={100}
									step={1}
								>
									<Slider.Track className="SliderTrack">
										<Slider.Range className="SliderRange" />
									</Slider.Track>
									<Slider.Thumb className="SliderThumb" aria-label="Volume" />
								</Slider.Root>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PlayerComponent;
