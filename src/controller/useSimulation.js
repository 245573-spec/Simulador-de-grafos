import { useState, useEffect } from 'react';

export function useSimulation(algorithmSteps, speedMs = 1000) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const currentFrame = algorithmSteps[currentStepIndex] ?? null;
    const isFinished = currentStepIndex >= algorithmSteps.length - 1;

    useEffect(() => {
        let timer;
        // Si está en "Play" y aún hay pasos, avanzamos
        if (isPlaying && !isFinished) {
            timer = setTimeout(() => {
                setCurrentStepIndex((prevIndex) => prevIndex + 1);
            }, speedMs);
        } else if (isFinished) {
            setIsPlaying(false);
        }

        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, algorithmSteps.length, speedMs, isFinished]);

    const play = () => {
    if (isFinished) setCurrentStepIndex(0);
    setIsPlaying(true);
  };
    const pause = () => setIsPlaying(false);
    const reset = () => { 
        setIsPlaying(false); 
        setCurrentStepIndex(0); 
    };

    return { 
        currentFrame, 
        isPlaying, 
        play, 
        pause, 
        reset 
    };
}