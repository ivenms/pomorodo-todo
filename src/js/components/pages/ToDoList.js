import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {connect} from 'react-redux';
import Card from "../elements/Card/Card";
import CardHeader from "../elements/Card/CardHeader";
import CardBody from "../elements/Card/CardBody";
import Button from '../elements/Button';
import styles from '../../jss/cardStyle';
import {Typography, Container, TextField} from "@material-ui/core";
import GridContainer from "../elements/Grid/GridContainer";
import GridItem from "../elements/Grid/GridItem";
import {createTodo} from "../../redux/actions";
import Table from "../elements/Table";
import moment from "moment";


const useStyles = makeStyles(styles);

const ToDoList = ({list, createAction}) => {
    const [fieldTitle, setFieldTitle] = useState('');
    const [fieldEstimate, setFieldEstimate] = useState('');
    const classes = useStyles();

    const listCard = (
        <Card>
            <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Todo List</h4>
                <p className={classes.cardCategoryWhite}>
                    List of items added to your todo list.
                </p>
            </CardHeader>
            <CardBody>
                <Table
                    tableHeaderColor="danger"
                    tableHead={[{"name": "No.", "align": "center"}, "Task", "Created At", "Updated At", "Belongs To",
                        {"name": "Remaining Time", "align": "center"},
                        {"name": "Actions", "type": "action", "align": "center"}
                    ]}
                    tableData={list.map((todo, index) => [
                        index + 1,
                        todo.title,
                        moment(todo.createdTime).format("DD MMM hh:mm A"),
                        moment(todo.updatedTime).format("DD MMM hh:mm A"),
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
    );

    const addFormCard = (
        <Card>
            <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Add New Item to your ToDo List</h4>
                <p className={classes.cardCategoryWhite}>
                    Create a new todo item for your pending jobs.
                </p>
            </CardHeader>
            <CardBody>
                <Container maxWidth="sm">
                    <TextField
                        id="task-title"
                        label="Task Name"
                        placeholder="Describe your task here"
                        value={fieldTitle}
                        onChange={(e) => {
                            setFieldTitle(e.target.value);
                        }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <TextField
                                type="number"
                                id="task-estimate"
                                label="Time to complete"
                                placeholder="Please estimate the time"
                                value={fieldEstimate}
                                onChange={(e) => {
                                    setFieldEstimate(e.target.value);
                                }}
                                helperText="Time take to complete the task in minutes"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <Button color="success" fullWidth size="large" style={{margin: "8px"}} onClick={() => {
                                createAction(fieldTitle, fieldEstimate);
                                setFieldTitle('');
                                setFieldEstimate('');
                            }}>Create</Button>
                        </GridItem>
                    </GridContainer>
                </Container>
            </CardBody>
        </Card>
    );

    return (
        <Typography contailer="div">
            {listCard}
            {addFormCard}
        </Typography>
    );
}

const mapStateToProps = state => ({
    list: state.todoList
});

const mapDispatchToProps = dispatch => ({
    createAction: (title, estimate, category) => dispatch(createTodo(title, estimate, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
