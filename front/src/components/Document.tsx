import React, { useState, useRef, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
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
    // const [image, setImage] = useState(propImage || './src/assets/placeholder.webp')
    const [image, setImage] = useState(propImage || './src/assets/3.jpg')
    const [title, setTitle] = useState(propTitle || def_title);
    const [body, setBody] = useState(propBody || '');
    const bodyRef = useRef<HTMLDivElement | null>(null);

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

    const save_doc = async () => {
        return new Promise(resolve => {
            setTimeout(resolve, 3000)
        })
        .then(() => {

            const existingDocs = JSON.parse(localStorage.getItem('documents') || '[]');

            if (propIndex !== null) {
                // Update the existing document
                existingDocs[propIndex] = {
                    title: title,
                    body: body,
                    image: image
                };
            } else {
                // Add a new document
                existingDocs.push({
                    title: title,
                    body: body,
                    image: image
                });
            }

            localStorage.setItem('documents', JSON.stringify(existingDocs));

            navigate('/home', {
                state: {
                    index: propIndex !== null ? propIndex : existingDocs.length - 1
                }
            });
        })
    }

    useEffect(() => {
        const existingDocs = JSON.parse(localStorage.getItem('documents') || '[]');

        if (propIndex !== null) {
        // Update the existing document
        existingDocs[propIndex] = {
            title: title,
            body: body,
            image: image
        };
    } else {
        // Add a new document
        existingDocs.push({
            title: title,
            body: body,
            image: image
        });
    }

    localStorage.setItem('documents', JSON.stringify(existingDocs));
}, [body, title]);


    const handleBodyChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newBody = e.currentTarget.innerHTML || '';
        if (newBody !== body) {
            setBody(newBody);
        }
    }

    return(
        <div className="document container column">
            <div className="img">
                <div className="overflow"></div>
                <img src={image} alt="" />
            </div>
            <div className={"title " + (title === def_title ? 'placeholder' : '')} >
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
           <div
                className='body'
                ref={bodyRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleBodyChange}
                dangerouslySetInnerHTML={{ __html: body }}
            />
            <div className="row center">
                <button className="submit" onClick={save_doc}>Save your Story</button>
            </div>
        </div>
    )
}

export default Document;