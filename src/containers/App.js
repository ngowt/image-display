import React from "react";
import { Header } from "../components/Header/Header";
import { ImageModal } from "./ImageModal/ImageModal";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { unsplash } from "../api/unsplash";
import { ImageList } from "../components/ImageList/ImageList";
import { Spinner } from "../components/Spinner/Spinner";
import { End } from "../components/End/End";
import {
  getScrollTop,
  getDocumentHeight,
  getDocumentWidth
} from "../common/domfunctions";
import randomWords from "random-words";

export class App extends React.Component {
  state = {
    images: [],
    page: 1,
    columns: 1,
    term: "",
    isLoading: false,
    totalPages: 0,
    isScrolledToBottom: false,
    showModal: false,
    focusedImage: ""
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScrollHandler);
    window.addEventListener("resize", this.onResizeHandler);
    this.resetColumns();
    this.onSearchSubmit(randomWords());
  };

  resetColumns = () => {
    this.setState({
      images: Array.from({ length: this.state.columns }, () => [])
    });
  };

  allocateImages = (results, source, numColumns) => {
    const copy = [...source];
    results.forEach(img => {
      for (let j = 0; j < numColumns; j++) {
        if (copy[j].length === Math.min(...copy.map(arr => arr.length))) {
          copy[j].push(img);
          break;
        }
      }
    });
    return copy;
  };

  unallocateImages = source => {
    return source.reduce((acc, cv) => [...acc, ...cv]);
  };

  onImageClickedHandler = image => {
    this.setState({ focusedImage: image, showModal: true });
  };

  onResizeHandler = () => {
    if (getDocumentWidth() >= 1200 && this.state.columns !== 4) {
      this.onSettingChangeHandler(4);
    } else if (getDocumentWidth() >= 992 && getDocumentWidth() < 1200 && this.state.columns !== 3) {
      this.onSettingChangeHandler(3);
    } else if (getDocumentWidth() >= 539 && getDocumentWidth() < 992 && this.state.columns !== 2) {
      this.onSettingChangeHandler(2);
    } else if (getDocumentWidth() < 539 && this.state.columns !== 1) {
      this.onSettingChangeHandler(1);
    }
  };

  onScrollHandler = () => {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) {
      this.setState({ isScrolledToBottom: false });
      return;
    }

    if (this.state.page >= this.state.totalPages) {
      this.setState({ isScrolledToBottom: true });
      return;
    }

    if (this.state.term !== "" && !this.state.isLoading) {
      this.setState({ isLoading: true }, async () => {
        const response = await unsplash.get(`/search/photos/`, {
          params: {
            query: this.state.term,
            per_page: 10,
            page: this.state.page + 1
          }
        });
        this.setState({
          images: this.allocateImages(
            response.data.results,
            this.state.images,
            this.state.columns
          ),
          page: this.state.page + 1,
          isLoading: false
        });
      });
    }
  };

  onSettingChangeHandler = val => {
    const unallocatedImages = this.unallocateImages(this.state.images);
    this.setState(
      {
        columns: val,
        images: Array.from({ length: val }, () => [])
      },
      () =>
        this.setState({
          images: this.allocateImages(
            unallocatedImages,
            this.state.images,
            this.state.columns
          )
        })
    );
  };

  onSearchSubmit = term => {
    if (term !== "" && !this.state.isLoading) {
      this.resetColumns();
      this.setState({ isLoading: true }, async () => {
        const response = await unsplash.get(`/search/photos/`, {
          params: { query: term, per_page: 10, page: 1 }
        });
        this.setState({
          images: this.allocateImages(
            response.data.results,
            this.state.images,
            this.state.columns
          ),
          term: term,
          page: 1,
          isLoading: false,
          totalPages: response.data.total_pages
        });
      });
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <Header />
        <SearchBar
          onSubmit={this.onSearchSubmit}
          onSettingChangeEvent={this.onSettingChangeHandler}
        />
        {this.state.showModal && (
          <ImageModal
            image={this.state.focusedImage}
            showModal={this.state.showModal}
            closeEvent={() => this.setState({ showModal: false })}
          />
        )}
        <ImageList
          imageColumns={this.state.images}
          numColumns={this.state.columns}
          onImageClickedEvent={this.onImageClickedHandler}
        />
        <Spinner isLoading={this.state.isLoading} />
        <End
          isEnd={
            this.state.isScrolledToBottom &&
            this.state.page >= this.state.totalPages
          }
        />
      </div>
    );
  }
}
