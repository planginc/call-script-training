import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioModule, getCacheBustedUrl } from '../data/audioPlaylist';

interface UseAudioPlayerProps {
  playlist: AudioModule[];
  onModuleComplete?: (moduleId: number) => void;
  onAllComplete?: () => void;
}

export const useAudioPlayer = ({ playlist, onModuleComplete, onAllComplete }: UseAudioPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentModule = playlist[currentIndex];

  // Load and play specific audio
  const loadAndPlayAudio = useCallback(async (moduleData: AudioModule) => {
    if (audioRef.current && !isLoading) {
      setIsLoading(true);
      
      // Pause and reset current audio first
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Set new source and properties (use cache-busted URL for 5 Options module)
      const url = moduleData.module === '5_OPTIONS' 
        ? getCacheBustedUrl(moduleData.url)
        : moduleData.url;
      audioRef.current.src = url;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = volume;
      
      // Load the new audio
      audioRef.current.load();
      
      // Wait for the audio to be ready, then play
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play was interrupted:', error);
        // If play fails, we'll let the user manually start
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [playbackRate, volume, isLoading]);

  // Play/Pause toggle
  const togglePlayPause = useCallback(async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Audio play was interrupted:', error);
          setIsPlaying(false);
        }
      }
    }
  }, [isPlaying]);

  // Skip to specific module
  const skipToModule = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentIndex(index);
      loadAndPlayAudio(playlist[index]);
    }
  }, [playlist, loadAndPlayAudio]);

  // Previous module
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      skipToModule(currentIndex - 1);
    }
  }, [currentIndex, skipToModule]);

  // Next module
  const handleNext = useCallback(() => {
    if (currentIndex < playlist.length - 1) {
      skipToModule(currentIndex + 1);
    }
  }, [currentIndex, playlist.length, skipToModule]);

  // Skip forward/backward in current audio
  const skipTime = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + seconds);
    }
  }, []);

  // Set playback rate
  const setPlaybackRateHandler = useCallback((rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  // Set volume
  const setVolumeHandler = useCallback((vol: number) => {
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  // Event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    // Mark current as completed
    setCompletedModules(prev => [...prev, currentIndex]);
    onModuleComplete?.(currentIndex);
    
    // Move to next module
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < playlist.length) {
      setCurrentIndex(nextIndex);
      // Small delay to prevent rapid play/pause conflicts
      setTimeout(() => {
        loadAndPlayAudio(playlist[nextIndex]);
      }, 100);
    } else {
      // All modules completed
      setIsPlaying(false);
      onAllComplete?.();
    }
  }, [currentIndex, playlist, loadAndPlayAudio, onModuleComplete, onAllComplete]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipTime(-10);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipTime(10);
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        if (audioRef.current) {
          audioRef.current.currentTime = duration;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setVolumeHandler(Math.min(1, volume + 0.1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setVolumeHandler(Math.max(0, volume - 0.1));
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        handleNext();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlayPause, skipTime, volume, setVolumeHandler, handleNext, handlePrevious, duration]);

  return {
    audioRef,
    currentIndex,
    currentModule,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    completedModules,
    playbackRate,
    volume,
    togglePlayPause,
    skipToModule,
    handlePrevious,
    handleNext,
    skipTime,
    setPlaybackRateHandler,
    setVolumeHandler,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleAudioEnded,
    handlePlay,
    handlePause,
    totalModules: playlist.length,
    progressPercentage: duration > 0 ? ((currentIndex + (currentTime / duration)) / playlist.length) * 100 : 0
  };
};
