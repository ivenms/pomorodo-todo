import React from "react";
import Redirect from "react-router-dom/Redirect"

import {connect} from 'react-redux';

const TimerPage = (props) => {
    const action = props.location.action || "show";
    const id = props.location.id || null;
    if (!id) {
        return <Redirect to="/todo-list" />
    }
    switch (action) {
        case "resume":
            return 'Timer Resume';
        case "show":
        default:
            return 'Timer Page';
    }
}

const mapStateToProps = state => ({
    list: state.todoList,
    timer: state.timer
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage);
