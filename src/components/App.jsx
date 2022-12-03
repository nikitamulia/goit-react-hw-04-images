import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { Searchbar } from "./Searchbar/Searchbar";
import { getPictures } from "Api/Api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import s from './app.module.css'



export  class App extends React.Component {

  state = {
    images: [],
    searchData: '',
    isLoading: false,
    page: 0,
    showModal: false,
    largeImage:'',
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchData = prevState.searchData;
    const { searchData, page, images } = this.state;
    if (prevPage !== page || prevSearchData !== searchData) {
      try {
        this.setState({ isLoading: true });
        const response = getPictures(searchData, page);
        response.then(data => {
          data.data.hits.length === 0
            ? toast.error('Nothing found')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } 
    }
  }

  onSubmit = searchData => {
    if (searchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (searchData === this.state.searchData) {
      return;
    }
    this.setState({
      searchData: searchData,
      page: 1,
      images: [],
    });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
 
  onClick = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  
  
  render(){
    return (
      <div className={s.app}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.onSubmit}/>
        {this.state.images.length !== 0 && (
          <ImageGallery photos={this.state.images} onClick={this.onClick} />
        )}
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal} largeImage={this.state.largeImage} />
        )}
         {this.state.isLoading && <Loader />}
        {this.state.images.length >= 12 && <Button nextPage={this.nextPage} />}
      </div>
    );
  }
  
};
