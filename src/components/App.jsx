import { useState, useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import Searchbar from "./Searchbar/Searchbar";
import { getPictures } from "Api/Api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import s from './app.module.css'



export default function App(){

  const [images, setImages] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [ ,setError] = useState(null);

  useEffect(() => {
    if (!page) {
      return;
    }

    try {
      setIsLoading(true);
      const response = getPictures(searchData, page);
      response.then(data => {
        data.data.hits.length === 0
          ? toast.error('Nothing found')
          : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
              !images.some(image => image.id === id) &&
                setImages(i => [...i, { id, webformatURL, largeImageURL }]);
            });
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [page, searchData, images]);

  const onSubmit = newSearchData => {
    if (newSearchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newSearchData === searchData) {
      return;
    }
      setSearchData(newSearchData);
      setPage(1);
      setImages([]);
  };

  const nextPage = () => {
    setPage(page => page + 1)
  };
 
  const onClick = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL)
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };
  
  
 
    return (
      <div className={s.app}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={onSubmit}/>
        {images.length !== 0 && (
          <ImageGallery photos={images} onClick={onClick} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
         {isLoading && <Loader />}
        {images.length >= 12 && <Button nextPage={nextPage} />}
      </div>
    );
  
  
};
