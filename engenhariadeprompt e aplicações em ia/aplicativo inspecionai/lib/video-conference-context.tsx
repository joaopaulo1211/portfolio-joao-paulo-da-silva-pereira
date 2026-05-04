import React, { createContext, useContext, useState } from "react";

interface VideoConferenceContextType {
  inspectionCode: string;
  setInspectionCode: (code: string) => void;
  isInConference: boolean;
  setIsInConference: (inConference: boolean) => void;
  startConference: (code: string) => void;
  endConference: () => void;
}

const VideoConferenceContext = createContext<
  VideoConferenceContextType | undefined
>(undefined);

export function VideoConferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inspectionCode, setInspectionCode] = useState("");
  const [isInConference, setIsInConference] = useState(false);

  const startConference = (code: string) => {
    setInspectionCode(code);
    setIsInConference(true);
  };

  const endConference = () => {
    setInspectionCode("");
    setIsInConference(false);
  };

  return (
    <VideoConferenceContext.Provider
      value={{
        inspectionCode,
        setInspectionCode,
        isInConference,
        setIsInConference,
        startConference,
        endConference,
      }}
    >
      {children}
    </VideoConferenceContext.Provider>
  );
}

export function useVideoConference() {
  const context = useContext(VideoConferenceContext);
  if (context === undefined) {
    throw new Error(
      "useVideoConference deve ser usado dentro de VideoConferenceProvider"
    );
  }
  return context;
}
