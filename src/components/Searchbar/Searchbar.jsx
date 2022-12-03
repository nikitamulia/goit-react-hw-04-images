import React from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

export class Searchbar extends React.Component{
    state = {
        searchData: '',
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      };
    handleNameChange = event => {
        this.setState({searchData: event.currentTarget.value.toLowerCase()})
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchData)
        this.setState({searchData: ''})
    }


    render(){
        return(
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit"  className={s.SearchForm__button }>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                    className={s.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.searchData}
                    onChange={this.handleNameChange}
                    />
                </form>
            </header>
        )
    }
}


