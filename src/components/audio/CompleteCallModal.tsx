import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Settings } from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { audioPlaylist, formatTime, getCacheBustedUrl } from '../../data/audioPlaylist';

interface CompleteCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompleteCallModal: React.FC<CompleteCallModalProps> = ({ isOpen, onClose }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const {
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
    totalModules
  } = useAudioPlayer({
    playlist: audioPlaylist,
    onModuleComplete: (moduleId) => {
      console.log(`Module ${moduleId + 1} completed`);
    },
    onAllComplete: () => {
      setShowCompletion(true);
    }
  });

  // Load the first audio file when modal opens
  useEffect(() => {
    if (isOpen && currentModule) {
      // Load the current module's audio without playing
      if (audioRef.current) {
        // Use cache-busted URL for 5 Options module to ensure updated file loads
        const url = currentModule.module === '5_OPTIONS' 
          ? getCacheBustedUrl(currentModule.url)
          : currentModule.url;
        audioRef.current.src = url;
        audioRef.current.load();
      }
    }
  }, [isOpen, currentModule, audioRef]);

  // Seek functionality
  const handleSeek = (newTime: number) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Add global mouse events for better dragging experience
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

  if (!isOpen) return null;

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onClose();
  };

  const handleRestart = () => {
    setShowCompletion(false);
    skipToModule(0);
  };

  const progressWidth = duration > 0 ? (currentTime / duration) * 100 : 0;
  const overallProgress = duration > 0 ? ((currentIndex + (currentTime / duration)) / totalModules) * 100 : (currentIndex / totalModules) * 100;

  // Handle mouse down on progress bar
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration > 0) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      setDragTime(newTime);
      handleSeek(newTime);
    }
  };

  // Handle mouse move while dragging
  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * duration;
      setDragTime(newTime);
    }
  };

  // Handle mouse up
  const handleProgressMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      handleSeek(dragTime);
    }
  };

  // Handle mouse leave
  const handleProgressMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      handleSeek(dragTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Call Recording</h2>
            <p className="text-sm text-gray-500">Total Duration: ~24 minutes</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Current Module Indicator */}
        <div 
          className="p-6 border-b border-gray-200"
          style={{ backgroundColor: `${currentModule?.color}20` }}
        >
          <div className="text-center">
            <div 
              className="text-2xl font-bold mb-2"
              style={{ color: currentModule?.color }}
            >
              Currently Playing: {currentModule?.title}
            </div>
            <div className="text-sm text-gray-600">
              {currentIndex + 1} of {totalModules} modules
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="p-6">
          <audio
            ref={audioRef}
            onEnded={handleAudioEnded}
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isLoading}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipBack className="h-6 w-6" />
            </button>
            
            <button
              onClick={togglePlayPause}
              disabled={isLoading}
              className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              {isLoading ? (
                <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === totalModules - 1 || isLoading}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward className="h-6 w-6" />
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

          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{isNaN(overallProgress) ? '0' : Math.round(overallProgress)}% Complete ({currentIndex + 1} of {totalModules} modules)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${isNaN(overallProgress) ? 0 : overallProgress}%`,
                  background: `linear-gradient(to right, ${audioPlaylist.map(m => m.color).join(', ')})`
                }}
              />
            </div>
          </div>

          {/* Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => skipTime(-10)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                -10s
              </button>
              <button
                onClick={() => skipTime(10)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                +10s
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Playback Speed
                  </label>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRateHandler(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume: {Math.round(volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolumeHandler(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module Playlist */}
        <div className="border-t border-gray-200 max-h-48 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Module Playlist</h3>
            <div className="space-y-2">
              {audioPlaylist.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => skipToModule(index)}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    index === currentIndex
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : completedModules.includes(index)
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: module.color }}
                    />
                    <span className="font-medium">{module.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{module.duration}</span>
                    {index === currentIndex && isPlaying && (
                      <Play className="h-4 w-4 text-blue-600" />
                    )}
                    {completedModules.includes(index) && (
                      <span className="text-green-600">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Completion Modal */}
        {showCompletion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 text-center max-w-md">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Congratulations!
              </h3>
              <p className="text-gray-600 mb-6">
                You've completed the entire call recording! Great job going through all 8 modules.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Listen Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
