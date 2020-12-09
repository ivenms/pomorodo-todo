import React, {useState, createRef} from "react";
import {Switch, Route, HashRouter} from "react-router-dom";
import {createBrowserHistory} from "history";
import PerfectScrollbar from "perfect-scrollbar";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// core components
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";
import Sidebar from "./components/elements/Sidebar";
import styles from "../templates/assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "../templates/assets/img/sidebar-2.jpg";
import logo from "../img/logo.png";

let ps;

import appRoutes from "./routes";

const history = createBrowserHistory();

const switchRoutes = (
    <Switch>
        {appRoutes.map((prop, key) => {
            return (
                <Route
                    path={prop.path} exact={prop.path === '/'}
                    component={prop.component}
                    key={key}
                />
            );
        })}
    </Switch>
);


const useStyles = makeStyles(styles);

export default function App({...rest}) {
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = createRef();
    // states and functions
    const [fixedClasses, setFixedClasses] = useState("dropdown show");
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleFixedClick = () => {
        if (fixedClasses === "dropdown") {
            setFixedClasses("dropdown show");
        } else {
            setFixedClasses("dropdown");
        }
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);
    return (
        <div className={classes.wrapper}>
            <HashRouter history={history}>
                <Sidebar
                    routes={appRoutes}
                    logoText={"Pomodoro List"}
                    logo={logo}
                    image={bgImage}
                    handleDrawerToggle={handleDrawerToggle}
                    open={mobileOpen}
                    color="red"
                    {...rest}
                />
                <div className={classes.mainPanel} ref={mainPanel}>
                    {/*<Navbar
                        routes={appRoutes}
                        handleDrawerToggle={handleDrawerToggle}
                        {...rest}
                    />*/}
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                    <Footer/>
                </div>
            </HashRouter>
        </div>
    );
};
