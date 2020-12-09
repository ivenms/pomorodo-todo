import React from "react";
import moment from "moment";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DoneAllTwoTone from "@material-ui/icons/DoneAllTwoTone";
import WatchLaterOutlined from "@material-ui/icons/WatchLaterOutlined";
import DoneOutlined from "@material-ui/icons/DoneOutlined";
import CallToActionOutlined from "@material-ui/icons/CallToActionOutlined";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "../elements/Grid/GridItem.js";
import GridContainer from "../elements/Grid/GridContainer.js";
import Table from "../elements/Table.js";
import Card from "../elements/Card/Card.js";
import CardHeader from "../elements/Card/CardHeader.js";
import CardIcon from "../elements/Card/CardIcon.js";
import CardBody from "../elements/Card/CardBody.js";
import CardFooter from "../elements/Card/CardFooter.js";


import styles from "../../../templates/assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {connect} from "react-redux";

const useStyles = makeStyles(styles);

const Home = ({list, timer}) => {
    const classes = useStyles();
    const completedTasks = list.filter(task => task.status === 'completed').length;
    const workingTime = 1228;
    const breakTime = 120;

    const cardTotalTasks = (
        <GridItem xs={12} sm={6} md={3}>
            <Card>
                <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        <Icon>assignment</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Total Tasks</p>
                    <h3 className={classes.cardTitle}>
                        {list.length}
                    </h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <CallToActionOutlined/>
                        All tasks.
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    );

    const cardCompletedTasks = (
        <GridItem xs={12} sm={6} md={3}>
            <Card>
                <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        <DoneAllTwoTone/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Completed Tasks</p>
                    <h3 className={classes.cardTitle}>{completedTasks}</h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <DoneOutlined/>
                        All finished tasks.
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    );

    const cardBreaksTime = (
        <GridItem xs={12} sm={6} md={3}>
            <Card>
                <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                        <Icon>free_breakfast_rounded</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Break Time</p>
                    <h3 className={classes.cardTitle}>{Math.round(breakTime / 60)} <small>mins.</small></h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <WatchLaterOutlined/>
                        {breakTime} seconds.
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    );

    const cardWorkingTime = (
        <GridItem xs={12} sm={6} md={3}>
            <Card>
                <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                        <Icon>fitness_center</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Working Time</p>
                    <h3 className={classes.cardTitle}>{Math.round(workingTime / 60)} <small>mins.</small></h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Update/>
                        {workingTime} seconds.
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    );

    return (
        <div>
            <GridContainer>
                {cardTotalTasks}
                {cardCompletedTasks}
                {cardBreaksTime}
                {cardWorkingTime}
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="warning">
                            <h3 className={classes.cardTitleWhite}>Pending Tasks</h3>
                            <p className={classes.cardCategoryWhite}>
                                Start your pending tasks based on your priority from below list.
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="warning"
                                tableHead={[{"name": "No.", "align": "center"}, "Task", "Created At", "Belongs To",
                                    {"name": "Remaining Time", "align": "center"},
                                    {"name": "Actions", "type": "action", "align": "center"}
                                ]}
                                tableData={list.filter(todo => todo.status === 'active').map((todo, index) => [
                                    index + 1,
                                    todo.title, moment(todo.createdTime).format("DD MMM hh:mm A"),
                                    todo.category,
                                    todo.estimate,
                                    todo.id
                                ])}
                                actions={[
                                    {"name": "Resume", "to": {"pathname": "/timer", "id": '$DATA', "action": "resume"}, "type": "button", "class": "warning"},
                                    {"name": "Mark as Complete", "to": {"pathname": "/todo-list", "id": '$DATA', "action": "complete"}, "type": "button", "class": "danger"}
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
};

const mapStateToProps = state => ({
    list: state.todoList,
    timer: state.timer
});
export default connect(mapStateToProps)(Home);
