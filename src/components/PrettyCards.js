import React from "react";
import moment from "moment";
import SvgIcon from "./SvgIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "../css/styles.css";

export default class PrettyCards extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="job__card">
            <div className="job__card__section-1">
                <div className="company-logo-container">
                    <SvgIcon src={this.props.src} classname="company-logo" />
                </div>
            </div>
            <div className="job__card__section-2"></div>
        </div>)
    }
}