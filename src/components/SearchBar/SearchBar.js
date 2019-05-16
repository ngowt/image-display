import React from "react";
import { SearchOptions } from "../SearchOptions/SearchOptions";

export class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="ui fluid action input">
            <input
              type="text"
              placeholder="Enter a word..."
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />
            <SearchOptions
              onSettingChangeEvent={this.props.onSettingChangeEvent}
            />
            <button
              className="ui button primary"
              onClick={e => this.onFormSubmit(e)}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}
