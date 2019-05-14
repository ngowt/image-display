import React from "react";
import { SearchBar } from "../components/SearchBar";
import { unsplash } from "../api/unsplash";
import { ImageList } from "../components/ImageList";
import { Spinner } from "../components/Spinner";
import { End } from "../components/End";
import { getScrollTop, getDocumentHeight } from "../common/domfunctions";

export class App extends React.Component {
  state = {
    images: [],
    TEMP_IMAGES: [],
    page: 1,
    columns: 4,
    term: "",
    isLoading: false,
    totalPages: 0,
    isScrolledToBottom: false
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScrollHandler);
    this.resetColumns();
  };

  resetColumns = () => {
    this.setState({
      TEMP_IMAGES: Array.from({ length: this.state.columns }, () => [])
    });
  };

  allocateImages = results => {
    const TEMP_IMAGES = this.state.TEMP_IMAGES;
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < TEMP_IMAGES.length; j++) {
        if (
          TEMP_IMAGES[j].length ===
          Math.min(...TEMP_IMAGES.map(arr => arr.length))
        ) {
          TEMP_IMAGES[j].push(results[i]);
          break;
        }
      }
    }
    return TEMP_IMAGES;
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
          images: [...this.state.images, ...response.data.results],
          TEMP_IMAGES: this.allocateImages(response.data.results),
          page: this.state.page + 1,
          isLoading: false
        });
      });
    }
  };

  onSearchSubmit = term => {
    if (term !== "" && !this.state.isLoading) {
      this.resetColumns();
      this.setState({ isLoading: true }, async () => {
        const response = await unsplash.get(`/search/photos/`, {
          params: { query: term, per_page: 10, page: 1 }
        });
        this.setState({
          images: response.data.results,
          TEMP_IMAGES: this.allocateImages(response.data.results),
          term: term,
          page: 1,
          isLoading: false,
          totalPages: response.data.total_pages
        });
      });
    }
  };

  render() {
    console.log(this.state.TEMP_IMAGES);
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
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
