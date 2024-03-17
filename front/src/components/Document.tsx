import React, { useState, useRef, useEffect } from 'react';
import Loader from './Loader';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import './doc.css'

interface DataProps {
    image: string | null,
    title: string | null,
    body: string | null,
    index: number | null,
}

const Document = ({image: propImage, title: propTitle, body: propBody, index: propIndex}: DataProps) => {
    
    const navigate = useNavigate();
    const def_title = 'Let AI create title for you'
    const [image, setImage] = useState(propImage || './src/assets/placeholder.webp')
    // const [image, setImage] = useState(propImage || './src/assets/3.jpg')
    const [title, setTitle] = useState(propTitle || def_title);
    const [body, setBody] = useState(propBody || '');
    const [loading, setLoading] = useState(false);
    const bodyRef = useRef<HTMLDivElement | null>(null);

    const [isBodyEmpty, setIsBodyEmpty] = useState(!body);

    useEffect(() => {
        if (bodyRef.current) {
            const range = document.createRange();
            range.selectNodeContents(bodyRef.current);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            bodyRef.current.focus();
        }
    }, [body]);

    const handleBodyKeyPress = () => {
        if (isBodyEmpty) {
            setBody('');
            setIsBodyEmpty(false);
        }
    }

    const save_doc = async () => {
        setLoading(true);
        axios
    .post(`${import.meta.env.VITE_API_URL}/ai`, {
        prompt: body,
        style: localStorage.getItem('style') || '',
        person: {
            age: localStorage.getItem('age'),
            gender: localStorage.getItem('gender'),
        }
    })
    .then((res) => {
        const newTitle = res.data.title;
        const newImage = `${import.meta.env.VITE_API_URL}/images/${res.data.image}`;

        setTitle(newTitle);
        setImage(newImage);

        const existingDocs = JSON.parse(localStorage.getItem('documents') || '[]');

        if (propIndex !== null) {
            // Update the existing document
            existingDocs[propIndex] = {
                title: newTitle,
                body: body,
                image: newImage
            };
        } else {
            // Add a new document
            existingDocs.push({
                title: newTitle,
                body: body,
                image: newImage
            });
        }

        localStorage.setItem('documents', JSON.stringify(existingDocs));

        setLoading(false);
        navigate('/home', {
            state: {
                index: propIndex !== null ? propIndex : existingDocs.length - 1
            }
        });
    })
    .catch((err) => {
        console.error(err);
        setLoading(false);
    })
    }


    const handleBodyChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newBody = e.currentTarget.innerHTML || '';
        setIsBodyEmpty(!newBody);
        if (newBody !== body) {
            setBody(newBody);
        }
    }

    return(
        <div className="document container column">
            {loading && <Loader />}
            <div className="img">
                <div className="overflow"></div>
                <img src={image} alt="" />
            </div>
            <div className={"title " + (title === def_title ? 'placeholder' : '')} >
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <hr />
           <div
                className='body'
                ref={bodyRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleBodyChange}
                onKeyDown={handleBodyKeyPress}
                dangerouslySetInnerHTML={{ __html: body || (isBodyEmpty ? '<span class="placeholder">Write a short story, let magic happen...</span>' : '') }}
            />
            <div className="row center">
                <button className="submit" onClick={save_doc}>Save your Story</button>
            </div>
        </div>
    )
}

export default Document;