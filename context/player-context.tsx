import React, { useEffect, useState } from 'react';

type State = {
  isPlaying: boolean;
  play: (url: string) => void;
  toggle: () => void;
};

const PlayerStateContext = React.createContext<State | undefined>(undefined);

function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const toggle = () => setIsPlaying(!isPlaying);

  // useEffect(() => {
  //   if (audio) {

  //   }
  // }, [isPlaying]);

  useEffect(() => {
    if (audio) {
      console.log('in audio load');
      audio.load();
      isPlaying ? audio.play() : audio.pause();
    }
  }, [audio]);

  useEffect(() => {
    audio && audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio && audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const play = (url: string) => {
    if (audio) audio.pause();
    setAudio(new Audio(url));
    setIsPlaying(true);
  };

  return (
    <PlayerStateContext.Provider value={{ isPlaying, play, toggle }}>
      {children}
    </PlayerStateContext.Provider>
  );
}

function usePlayer() {
  const context = React.useContext(PlayerStateContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

export { PlayerProvider, usePlayer };
