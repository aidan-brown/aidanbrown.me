import React, { useEffect, useRef } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';

import './audio.scss';
import { AudioProps } from './audio.utils';

const FF_Factor = 5;

export const AudioPage = ({ src, title, artist }: AudioProps) => {
  const audioControls = useVoiceVisualizer({ shouldHandleBeforeUnload: false });
  const {
    error,
    setPreloadedAudioBlob,
    togglePauseResume,
    stopAudioPlayback,
    setCurrentAudioTime,
    audioRef,
    currentAudioTime,
    isPausedRecordedAudio
  } = audioControls;

  useEffect(() => {
    fetch(src)
      .then((r) => r.blob())
      .then((blob) => setPreloadedAudioBlob(blob));
  }, []);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);

  const handleStop = () => {
    stopAudioPlayback();
    audioRef.current!.currentTime = 0;
    setCurrentAudioTime(0);
  };

  const handlePlayPause = () => {
    togglePauseResume();
  };

  const handleRewind = () => {
    const ffTime = currentAudioTime - FF_Factor;
    audioRef.current!.currentTime = ffTime;
    setCurrentAudioTime(ffTime);
  };

  const handleFastForward = () => {
    const ffTime = currentAudioTime + FF_Factor;
    audioRef.current!.currentTime = ffTime;
    setCurrentAudioTime(ffTime);
  };

  const titleArtist = Array.from(Array(5)).map(() => (
    <span>
      Now Playing: {title} - {artist}
    </span>
  ));

  return (
    <div className="Audio">
      <VoiceVisualizer
        controls={audioControls}
        fullscreen
        isControlPanelShown={false}
        height={100}
        backgroundColor="#000"
      />
      <div className="audio-controls">
        <button
          className="haos-border haos-button zicons"
          onClick={handleStop}
          title="Stop"
        >
          <span>¦</span>
        </button>
        <button
          className="haos-border haos-button zicons rewind"
          onClick={handleRewind}
          title="Rewind"
        >
          <span>N</span>
          <span>N</span>
        </button>
        <button
          className="haos-border haos-button zicons"
          onClick={handlePlayPause}
          title={isPausedRecordedAudio ? 'Play' : 'Pause'}
        >
          <span>{isPausedRecordedAudio ? 'O' : 'R'}</span>
        </button>
        <button
          className="haos-border haos-button zicons ff"
          onClick={handleFastForward}
          title="Fast Forward"
        >
          <span>O</span>
          <span>O</span>
        </button>
      </div>
      <div className="audio-title">
        <p className="marquee">{titleArtist}</p>
      </div>
    </div>
  );
};
