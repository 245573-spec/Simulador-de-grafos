import { useState, useEffect } from 'react';

export function useSimulation(algorithmSteps, speedMs = 1000) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentFrame = algorithmSteps[currentStepIndex] ?? null;
    const isFinished = algorithmSteps.length > 0 && currentStepIndex >= algorithmSteps.length - 1;

    useEffect(() => {
        let timer;
        if (isPlaying && !isFinished) {
            timer = setTimeout(() => {
                setCurrentStepIndex((prevIndex) => prevIndex + 1);
            }, speedMs);
        } else if (isPlaying && isFinished) {
            // 2. Añade "isPlaying &&" para que solo se apague al terminar una reproducción real:
            setIsPlaying(false);
        }

        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, isFinished, speedMs]);
    const play = () => {
        if (isFinished) setCurrentStepIndex(0);
        setIsPlaying(true);
    };
    const pause = () => setIsPlaying(false);

    const resume = () => {
        if (!isPlaying && !isFinished) {
            setIsPlaying(true);
        }
    };
    const reset = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
    };

    return {
        currentFrame,
        isPlaying,
        play,
        pause,
        resume,
        reset
    };
}