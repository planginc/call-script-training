import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  SkipBack, 
  SkipForward, 
  Settings,
  RotateCcw,
  RefreshCcw
} from 'lucide-react';

interface EnhancedAudioPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export const EnhancedAudioPlayer: React.FC<EnhancedAudioPlayerProps> = ({ 
  src, 
  title = "Audio Recording",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio play was interrupted:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Skip time functions
  const skipTime = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    }
  }, [duration]);

  const skipToStart = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  const skipToEnd = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = duration;
    }
  }, [duration]);

  // Seek to specific time
  const handleSeek = useCallback((newTime: number) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = newTime;
    }
  }, [duration]);

  // Volume controls
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  // Playback rate controls
  const handlePlaybackRateChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  // Loop toggle
  const toggleLoop = useCallback(() => {
    setIsLooping(!isLooping);
  }, [isLooping]);

  // Event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;
    }
  }, [volume, playbackRate, isLooping]);

  const handleEnded = useCallback(() => {
    if (!isLooping) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isLooping]);

  // Progress bar handlers
  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (duration > 0) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      setDragTime(newTime);
      handleSeek(newTime);
    }
  }, [duration, handleSeek]);

  const handleProgressMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * duration;
      setDragTime(newTime);
    }
  }, [isDragging, duration]);

  const handleProgressMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      handleSeek(dragTime);
    }
  }, [isDragging, dragTime, handleSeek]);

  const handleProgressMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      handleSeek(dragTime);
    }
  }, [isDragging, dragTime, handleSeek]);

  // Global mouse events for better dragging experience
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        handleSeek(dragTime);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && duration > 0) {
        const progressBar = document.querySelector('.progress-bar-container');
        if (progressBar) {
          const rect = progressBar.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = Math.max(0, Math.min(1, clickX / rect.width));
          const newTime = percentage * duration;
          setDragTime(newTime);
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragTime, duration, handleSeek]);

  // Update audio properties when they change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;
    }
  }, [volume, playbackRate, isLooping, isMuted]);

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
        skipToStart();
      } else if (e.key === 'End') {
        e.preventDefault();
        skipToEnd();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleVolumeChange(Math.min(1, volume + 0.1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleVolumeChange(Math.max(0, volume - 0.1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlayPause, skipTime, volume, handleVolumeChange, skipToStart, skipToEnd]);

  const progressWidth = duration > 0 ? (isDragging ? dragTime : currentTime) / duration * 100 : 0;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Controls */}
      <div className="p-4">
        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={skipToStart}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Skip to start"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => skipTime(-10)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Skip back 10s"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={() => skipTime(10)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Skip forward 10s"
          >
            <SkipForward className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleLoop}
            className={`p-2 rounded-full transition-colors ${
              isLooping 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title="Toggle loop"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{formatTime(isDragging ? dragTime : currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="w-full bg-gray-200 rounded-full h-2 cursor-pointer relative group progress-bar-container"
            onMouseDown={handleProgressMouseDown}
            onMouseMove={handleProgressMouseMove}
            onMouseUp={handleProgressMouseUp}
            onMouseLeave={handleProgressMouseLeave}
          >
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${isNaN(progressWidth) ? 0 : progressWidth}%` }}
            />
            {/* Draggable Handle */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ 
                left: `${isNaN(progressWidth) ? 0 : progressWidth}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        </div>

        {/* Quick Skip Buttons */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <button
            onClick={() => skipTime(-30)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            -30s
          </button>
          <button
            onClick={() => skipTime(-10)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            -10s
          </button>
          <button
            onClick={() => skipTime(10)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            +10s
          </button>
          <button
            onClick={() => skipTime(30)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            +30s
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Playback Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Playback Speed
                </label>
                <select
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0.5}>0.5x (Slow)</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x (Normal)</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x (Fast)</option>
                </select>
              </div>

              {/* Volume Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume: {Math.round((isMuted ? 0 : volume) * 100)}%
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Loop Control */}
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isLooping}
                  onChange={toggleLoop}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Loop audio</span>
              </label>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 text-xs text-gray-500">
          <div className="grid grid-cols-2 gap-2">
            <div>Space: Play/Pause</div>
            <div>←/→: Skip ±10s</div>
            <div>↑/↓: Volume ±10%</div>
            <div>Home/End: Start/End</div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
};
