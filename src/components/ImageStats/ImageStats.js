import React from "react";
import { Icon, Statistic } from "semantic-ui-react";
import numeral from "numeral";

export const ImageStats = ({ likes, downloads, views }) => {
  return (
    <Statistic.Group horizontal widths="three">
      <Statistic>
        <Statistic.Value color="red">
          <Icon name="heart" color="red" />
          {numeral(likes).format("0,0")}
        </Statistic.Value>
        <Statistic.Label>likes</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value color="green">
          <Icon name="download" color="green" />
          {numeral(downloads).format("0,0")}
        </Statistic.Value>
        <Statistic.Label>downloads</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value color="blue">
          <Icon name="eye" color="blue" />
          {numeral(views).format("0,0")}
        </Statistic.Value>
        <Statistic.Label>views</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};
