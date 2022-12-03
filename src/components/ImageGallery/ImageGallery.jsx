import React from "react";
import PropTypes from "prop-types"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import s from './ImageGallery.module.css'

export const ImageGallery =({photos, onClick}) => {
    return(
        <ul className={s.ImageGallery}>
            {photos.map(({ id, webformatURL }, index) => (
            <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            index={index}
            onClick={onClick}
            />
      ))}
        </ul>
    )
}
ImageGallery.propTypes={
    onClick: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }))
}