/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../../templates/assets/jss/material-dashboard-react/components/footerStyle.js";
import routes from "../../routes";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        {routes.filter(function (item) {
                            return item.navPlacement === 'footer';
                        }).map((prop, key) => {
                            return (
                                <ListItem className={classes.inlineBlock}>
                                    <NavLink to={prop.path} className={classes.block}>
                                        {prop.name}
                                    </NavLink>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <p className={classes.right}>
          <span>
            This project is released in MIT license. The libraries used by the app is listed on credits page.
          </span>
                </p>
            </div>
        </footer>
    );
}
