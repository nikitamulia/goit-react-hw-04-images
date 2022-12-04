import { useState } from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

export default function Searchbar({onSubmit}){
    const [searchData, setSearchData] = useState('');
    
    const handleNameChange = event => setSearchData(event.currentTarget.value.toLowerCase())
    
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(searchData);
        setSearchData('');
    }


   
        return(
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit"  className={s.SearchForm__button }>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                    className={s.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchData}
                    onChange={handleNameChange}
                    />
                </form>
            </header>
        )
    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

