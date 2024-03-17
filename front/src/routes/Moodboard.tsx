const names = [
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S'
]

const emotions = [
    'happy',
    'neutral',
    'sad',
    'lovely',
    'angry'
]

const days = [
    [26, 27, 28, 29, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31]
]

import axios from "axios"
import { useState } from "react"

const Moodboard = () => {
    const [emotionsState, setEmotionsState] = useState(Array(31).fill('').map(() => emotions[Math.floor(Math.random() * emotions.length)]));
    const [tip, setTip] = useState('');
    const firstDayIndex = days[0].findIndex(day => day === 1);

    const generateRandomEmotions = () => {
        setEmotionsState(emotionsState.map(() => emotions[Math.floor(Math.random() * emotions.length)]));
    };

    const get_tip = async () => {
        setTip('Thinking...')
        const emotionCounts = emotionsState.reduce((counts: Record<string, number>, emotion) => {
            counts[emotion] = (counts[emotion] || 0) + 1;
            return counts;
        }, {});
        axios
            .post(`${import.meta.env.VITE_API_URL}/tip`, {
                emotions: emotionCounts
            })
            .then(response => {
                const responseText = response.data.tip;
                const paragraphs = responseText.split('\n').map((line:string, index: number) => <p key={index}>{line}</p>);
                setTip(paragraphs);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return(
        <div className="moodboard">
            <h2>
                Montly overview (example)
            </h2>
            <button onClick={generateRandomEmotions} className="gen">Generate New Emotions</button>
            <div className="calendar column">
                <div className="month">March</div>
                <div className="row week">
                    {names.map((day, i) => <div key={i} className="day name">{day}</div>)}
                </div>
                {days.map((week, i) => (
                    <div key={i} className="row week">
                        {week.map((day, j) => {
                            const emotion = emotionsState[Math.floor(Math.random() * emotionsState.length)];
                            return (
                                <div key={j} className={`day ${i === 0 && j < firstDayIndex ? 'old' : ''}`}>
                                    {day}
                                    <img src={`./src/assets/${emotion}.svg`} alt={emotion} />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <h3>AI tips</h3>
            <button onClick={get_tip}>Get AI tip</button>
            <div className="hint">The response may take a while since used the most huge and advanced Claude AI version</div>
            <div className="tip">{tip}</div>
        </div>
    )
}

export default Moodboard;