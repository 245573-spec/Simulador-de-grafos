import { useState, useEffect } from 'react';

export function useSimulation(algorithmSteps, speedMs = 1000) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Estado actual que se dibujará en la pantalla
    const currentFrame = algorithmSteps[currentStepIndex] || null;

    useEffect(() => {
        let timer;
        // Si está en "Play" y aún hay pasos, avanzamos
        if (isPlaying && currentStepIndex < algorithmSteps.length - 1) {
            timer = setInterval(() => {
                setCurrentStepIndex((prevIndex) => prevIndex + 1);
            }, speedMs);
        } else if (currentStepIndex >= algorithmSteps.length - 1) {
            setIsPlaying(false);
        }

        return () => clearInterval(timer);
    }, [isPlaying, currentStepIndex, algorithmSteps, speedMs]);

    const play = () => setIsPlaying(true);
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