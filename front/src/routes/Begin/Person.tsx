import { Dispatch, SetStateAction, useState } from 'react';

interface PersonProps {
    selectedImage: string;
    setPage: Dispatch<SetStateAction<number>>;
    setPersonData: Dispatch<SetStateAction<{name: string, age: string, gender: string}>>;
}

const Person = ({selectedImage, setPage, setPersonData}: PersonProps) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [ageValid, setAgeValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setNameValid(name !== '');
        setAgeValid(age !== '');
        setGenderValid(gender !== '');

        if (name !== '' && age !== '' && gender !== '') {
            setPersonData({name, age, gender});
            setPage(2);

            // Write data to local storage
            localStorage.setItem('name', name);
            localStorage.setItem('age', age);
            localStorage.setItem('gender', gender);
        }
    }

    return(
        <>
        <div className="person row">
            <div className="container column">
                <h2>
                    2. Tell about yourself
                </h2>
                <form onSubmit={handleSubmit} className='column'>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={nameValid ? '' : 'invalid'} />
            </label>
            <label>
                Age:
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className={ageValid ? '' : 'invalid'}/>
            </label>
            <label>
                Gender:
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className={genderValid ? '' : 'invalid'} />
            </label>
            <div className="btns row">
            <button type="button" onClick={() => setPage(0)}>Back</button>
            <button type="submit">Next</button>

            </div>
        </form>
            </div>
            
        </div>
        </>
    )
}

export default Person;