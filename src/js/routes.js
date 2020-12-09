import React from "react";
import {Home, List, Timer} from "@material-ui/icons";
import HomePage from "./components/pages/Home";
import ToDoList from "./components/pages/ToDoList";
import TimerPage from "./components/pages/Timer";
import Credits from "./components/pages/Credits";

const icons = {
    "home": Home,
    "todoList": List,
    "timer": Timer,
};

const appRoutes = [
    {
        path: "/",
        name: "Home",
        icon: icons.home,
        component: HomePage,
        navPlacement: "sidebar"
    },
    {
        path: "/timer",
        name: "Pomodoro Timer",
        icon: icons.timer,
        component: TimerPage,
        navPlacement: "sidebar"
    },
    {
        path: "/todo-list",
        name: "ToDo List",
        icon: icons.todoList,
        component: ToDoList,
        navPlacement: "sidebar"
    },
    {
        path: "/credits",
        name: "Credits",
        component: Credits,
        navPlacement: "footer"
    }
];

export default appRoutes;
