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

const Moodboard = () => {
    const firstDayIndex = days[0].findIndex(day => day === 1);

    return(
        <>
            <h2>
                Montly overview
            </h2>
            <div className="calendar column">
                <div className="row week">
                    {names.map((day, i) => <div key={i} className="day name">{day}</div>)}
                </div>
                {days.map((week, i) => (
                    <div key={i} className="row week">
                        {week.map((day, j) => 
                            <div key={j} className={`day ${i === 0 && j < firstDayIndex ? 'old' : ''}`}>{day}</div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Moodboard;