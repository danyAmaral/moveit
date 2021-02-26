import {  createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number, 
    currentExperience: number, 
    challengesCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void,
    startNewChallenge:() => void,
    resetChallenge:() => void,
    completeChallenge:() => void,
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setAtiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random()  * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setAtiveChallenge(challenge);
    }

    function resetChallenge() {
        setAtiveChallenge(null);
    }

    function completeChallenge() {

        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;
        let finalExperiece = currentExperience + amount;

        if(finalExperiece >= experienceToNextLevel) {
            finalExperiece = finalExperiece - experienceToNextLevel;
            levelUp();
        }

        console.log(finalExperiece)
        setCurrentExperience(finalExperiece);
        setAtiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted, 
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
            }} >
            {children}
        </ChallengesContext.Provider>
    )
}