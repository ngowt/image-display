import React from "react";
import { Icon, Statistic, StatisticGroup } from "semantic-ui-react";
import numeral from "numeral";
import "./ImageStats.css";

export const ImageStats = ({ statistics }) => {
  const { likes, downloads, views } = statistics;
  return (
    <div>
      <StatisticGroup widths="two">
        <Statistic>
          <Statistic.Value className="basestat">
            <Icon name="heart" color="red" />
            {numeral(likes.total).format("0,0")}
          </Statistic.Value>
          <Statistic.Label className="basestat">likes</Statistic.Label>
        </Statistic>
        <Statistic color={likes.change > 0 ? "green" : "grey"}>
          <Statistic.Value className="stat-change">
            <Icon name="long arrow alternate up" color={"green"} />
            {numeral(likes.change).format("0,0")}
          </Statistic.Value>
        </Statistic>
      </StatisticGroup>
      <StatisticGroup widths="two">
        <Statistic>
          <Statistic.Value className="basestat">
            <Icon name="download" color="green" />
            {numeral(downloads.total).format("0,0")}
          </Statistic.Value>
          <Statistic.Label className="basestat">downloads</Statistic.Label>
        </Statistic>
        <Statistic color={downloads.change > 0 ? "green" : "grey"}>
          <Statistic.Value className="stat-change">
            <Icon name="long arrow alternate up" color="green" />
            {numeral(downloads.change).format("0,0")}
          </Statistic.Value>
        </Statistic>
      </StatisticGroup>
      <StatisticGroup widths="two">
        <Statistic>
          <Statistic.Value className="basestat">
            <Icon name="eye" color="blue" />
            {numeral(views.total).format("0,0")}
          </Statistic.Value>
          <Statistic.Label className="basestat">views</Statistic.Label>
        </Statistic>
        <Statistic color={views.change > 0 ? "green" : "grey"}>
          <Statistic.Value className="stat-change">
            <Icon name="long arrow alternate up" color="green" />
            {numeral(views.change).format("0,0")}
          </Statistic.Value>
        </Statistic>
      </StatisticGroup>
    </div>
  );
};
