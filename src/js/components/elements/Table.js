import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {Table, TableHead, TableRow, TableBody, TableCell, ButtonGroup} from "@material-ui/core";

import Button from './Button';
import styles from "../../jss/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const history = useHistory();
    const classes = useStyles();
    const {tableHead, tableData, tableHeaderColor, actions} = props;
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={`${classes.tableCell} ${classes.tableHeadCell} ${classes.center}`}
                                        key={key}
                                    >
                                        {typeof prop === 'object' ? prop.name : prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        return (
                            <TableRow key={key} className={classes.tableBodyRow}>
                                {prop.map((prop, key) => {
                                    const alignClass = typeof tableHead[key] === 'object' && tableHead[key].align && classes[tableHead[key].align] ? ` ${classes[tableHead[key].align]}` : '';
                                    const actionType = typeof tableHead[key] === 'object' && tableHead[key].type && tableHead[key].type === 'action';
                                    return (
                                        <TableCell className={classes.tableCell + alignClass} key={key}>
                                            {actionType ? <ButtonGroup>
                                                {actions.map(action => {
                                                    const path = typeof action.to === 'object' ? JSON.parse(JSON.stringify(action.to).replace('$DATA', prop)) : action.to;
                                                    switch (action.type) {
                                                        case 'button':
                                                        default:
                                                            return <Button color={action.class || 'primary'} size="sm" onClick={() => history.push(path)}>{action.name}</Button>;
                                                    }
                                                })}
                                            </ButtonGroup> : prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
