import React from "react";
import { Image } from "semantic-ui-react";
import logo from "../../images/logo.svg";
import "./Header.css";

export const Header = () => (
  <div className="main-header">
    <Image centered size="large" src={logo} />
  </div>
);
