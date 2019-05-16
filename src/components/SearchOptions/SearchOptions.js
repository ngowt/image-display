import React from "react";
import { Dropdown } from "semantic-ui-react";

const columnOptions = [
  { key: "1", text: "Columns: 1", value: 1 },
  { key: "2", text: "Columns: 2", value: 2 },
  { key: "3", text: "Columns: 3", value: 3 },
  { key: "4", text: "Columns: 4", value: 4 }
];

export class SearchOptions extends React.Component {
  handleChange = (e, { value }) => this.props.onSettingChangeEvent(value);

  render = () => {
    return (
      <Dropdown
        button
        className="icon"
        icon="setting"
        options={columnOptions}
        onChange={this.handleChange}
      />
    );
  };
}
