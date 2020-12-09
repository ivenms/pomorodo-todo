import {useLocation} from "react-router-dom";

export function activeRoute(routeName) {
    const location = useLocation();
    return routeName === location.pathname;
}
