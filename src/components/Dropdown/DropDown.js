import React, { useEffect, useRef, useState } from 'react';
import { cities } from '../../constants/cities.js'
import './DropDown.css'

const DropDown = ({ setValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
    }, []);

    const toggle = (e) => {
        if (e && e.target == inputRef.current) {
            setIsOpen(true);
            setQuery('');
            setValue('');
        }
        else {
            setIsOpen(false);
        }
    }

    const filter = (options) => {
        return options.filter(
            (option) => option.toLowerCase().indexOf(query.toLowerCase()) > -1
        ).slice(0,10);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        setValue(e.target.value);
    }

    const setQueryFromDropDown = (city) => {
        setQuery(city);

    }

    return (
        <div className='dropdown-container'>
            <input type='text' placeholder='Enter a city' ref={inputRef} value={query} onChange={(e) => handleChange(e)} className='dropdown-input' />
            <div className='dropdown'>
            {isOpen && filter(cities).map((city) => {
                return <div className="single" onClick={() => {
                    setValue(city);
                    setQueryFromDropDown(city);
                }}>{city}</div>
            })}
            </div>
        </div>
    )
}

export default DropDown
