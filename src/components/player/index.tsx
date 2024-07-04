import React, { useEffect, useState, type FC } from "react";
import type { Track as TrackModel } from "../../models";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { FaCirclePause } from "react-icons/fa6";
import { FaVolumeLow } from "react-icons/fa6";
import { FaCirclePlay } from 'react-icons/fa6';
import * as Slider from "@radix-ui/react-slider";
import axios from "axios";

interface PlayerProps {
	track: TrackModel | null;
	token: string | null;
}

const PlayerComponent: FC<PlayerProps> = ({ track, token }) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [playbackInfo, setPlaybackInfo] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
				setPlaybackInfo(response.data); // Store the playback data in state
			} catch (error) {
				console.error("Error fetching playback status:", error);
				setPlaybackInfo(null); // Handle error or case when data is not available
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
      if(error.message === 'Request failed with status code 404') {
        window.alert('Play something on your Spotify app then try again :)')
      }
		}
	};
	if (!track) {
		return (
			<div
      className='no-track-container'
			>
				No track selected
			</div>
		);
	}

	console.log("playyback info", playbackInfo);
	return (
		<>
			{!track ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "60%",
						height: "90vh",
						fontWeight: "bold",
					}}
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
								<FaVolumeLow size={20} />
								<Slider.Root
									className="SliderRoot"
									defaultValue={[50]}
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
