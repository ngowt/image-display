import React from "react";
import { SearchBar } from "./SearchBar";
import { unsplash } from "../api/unsplash";
import { ImageList } from "./ImageList";

const getScrollTop = () => {
  return !!window.pageYOffset
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
};

const getDocumentHeight = () => {
  const { body, documentElement: html } = document;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};

export class App extends React.Component {
  state = { images: [], page: 1, term: "", isLoading: false };

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScrollHandler);
  };

  onScrollHandler = async () => {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    if (this.state.term !== "" && !this.state.isLoading) {
      this.setState({ isLoading: true }, async () => {
        const response = await unsplash.get(`/search/photos/`, {
          params: {
            query: this.state.term,
            per_page: 30,
            page: this.state.page + 1
          }
        });
        this.setState({
          images: [...this.state.images, ...response.data.results],
          page: this.state.page + 1,
          isLoading: false
        });
      });
    }
  };

  onSearchSubmit = term => {
    if (term !== "" && !this.state.isLoading) {
      this.setState({ isLoading: true }, async () => {
        const response = await unsplash.get(`/search/photos/`, {
          params: { query: term, per_page: 10, page: 1 }
        });
        this.setState({
          images: response.data.results,
          term: term,
          page: 1,
          isLoading: false
        });
      });
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
        {this.state.isLoading && <div>Loading...</div>}
      </div>
    );
  }
}

// Testing
