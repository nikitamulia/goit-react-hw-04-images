import React from "react";
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({webformatURL, index, onClick}) => {
    return(
        <li onClick={() => onClick(index)} className={s.ImageGalleryItem}>
            <img className={s.ImageGalleryItemImage} src={webformatURL} alt='' />
        </li>
    )
}
ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    webformatURL:PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };