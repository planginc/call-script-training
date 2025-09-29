export interface AudioModule {
  id: number;
  module: string;
  title: string;
  url: string;
  duration: string;
  durationSeconds: number;
  color: string;
}

export const audioPlaylist: AudioModule[] = [
  {
    id: 1,
    module: "INTRO",
    title: "1. INTRO",
    url: "/Audio Recordings/1 - Intro.wav",
    duration: "2:15",
    durationSeconds: 135,
    color: "#ffc642"
  },
  {
    id: 2,
    module: "UNDERSTAND_SITUATION",
    title: "2. UNDERSTAND THEIR SITUATION",
    url: "/Audio Recordings/2 - Understand their situation.wav",
    duration: "3:45",
    durationSeconds: 225,
    color: "#4574c4"
  },
  {
    id: 3,
    module: "DISCOVERY",
    title: "3. DISCOVERY",
    url: "/Audio Recordings/3 - Discovery.wav",
    duration: "4:20",
    durationSeconds: 260,
    color: "#70ad47"
  },
  {
    id: 4,
    module: "DEBT_VERIFICATION",
    title: "4. DEBT VERIFICATION",
    url: "/Audio Recordings/4 - Debt Verification.wav",
    duration: "3:10",
    durationSeconds: 190,
    color: "#ed7d31"
  },
  {
    id: 5,
    module: "CREDIT_ANALYSIS",
    title: "5. CREDIT ANALYSIS",
    url: "/Audio Recordings/5 - Credit Analysis.wav",
    duration: "4:30",
    durationSeconds: 270,
    color: "#7030a0"
  },
  {
    id: 6,
    module: "5_OPTIONS",
    title: "6. 5 OPTIONS",
    url: "/Audio Recordings/6 - 5 Options.wav",
    duration: "5:00",
    durationSeconds: 300,
    color: "#ffff7f"
  },
  {
    id: 7,
    module: "PROGRAM_EXPLANATION",
    title: "7. PROGRAM EXPLANATION",
    url: "/Audio Recordings/7 - Program Explanation.wav",
    duration: "2:48",
    durationSeconds: 168,
    color: "#ff0000"
  },
  {
    id: 8,
    module: "PRE_APPROVAL",
    title: "8. PRE-APPROVAL/BUDGET INSTRUCTIONS",
    url: "/Audio Recordings/8 - Pre-Approval--Budget Instructions.wav",
    duration: "3:30",
    durationSeconds: 210,
    color: "#9E9E9E"
  }
];

export const getTotalDuration = (): number => {
  return audioPlaylist.reduce((total, module) => total + module.durationSeconds, 0);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Cache-busting function to ensure updated audio files load
export const getCacheBustedUrl = (url: string): string => {
  const timestamp = new Date().getTime();
  return `${url}?v=${timestamp}`;
};
