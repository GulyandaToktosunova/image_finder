import React, { Component } from "react";
import "./App.css";
import ImageGallery from "./component/ImageGallery";
import Searchbar from "./component/Searchbar";
import axios from "axios";
import LoadMoreBtn from "./component/LoadMoreBtn";
import Modal from "./component/Modal";
export default class App extends Component {
  state = {
    images: [],
    query: "",
    currentPage: 1,
    loading: false,
    showModal: false,
    src: null,
  };
  handleSubmit = (data) => {
    this.setState({ query: data, images: [], loading: true });
  };
  componentDidMount() {
    const apiUrl = `https://pixabay.com/api/?key=30756576-2098874f9340e18dcfced0ce1&q=yellow+flowers&image_type=photo&pretty=true`;
    axios.get(apiUrl).then((res) => {
      const allItem = res.data.hits;
      this.setState({ images: allItem });
    });
  }
  componentDidUpdate() {
    const { loading } = this.state;
    if (loading) {
      this.loadImages();
    }
  }
  loadImages = async () => {
    try {
      const apiUrl = `https://pixabay.com/api/?key=30756576-2098874f9340e18dcfced0ce1&q=${this.state.query}&image_type=photo&pretty=true&page=${this.state.currentPage}`;
      await axios.get(apiUrl).then((res) => {
        const allItem = res.data.hits;
        this.setState(({ images }) => ({
          images: [...images, ...allItem],
          loading: false,
        }));
      });
    } catch (error) {
      throw new Error();
    }
  };
  handleLoadMore = () => {
    this.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
      loading: true,
    }));
  };
  toggleModal = (src) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      src,
    }));
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} showModal={this.toggleModal} />
        <LoadMoreBtn onClick={this.handleLoadMore} />
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <img
              src={this.state.src}
              alt="img"
              style={{ height: "90hv", width: "100vw", borderRadius: "5px" }}
            />
          </Modal>
        )}
      </>
    );
  }
}
