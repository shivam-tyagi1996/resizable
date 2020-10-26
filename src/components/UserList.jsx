import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import tableHeaders from '../constants/employee';


const UserList = (props) => {
    const { data, onClickEdit } = props;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        Object.keys(tableHeaders).map(header => (
                            <TableCell>{tableHeaders[header]}</TableCell>
                        ))
                    }
                    <TableCell> Action </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map(row => (
                        <TableRow>
                            {Object.keys(tableHeaders).map(cell => (
                                <TableCell>{row[cell]}</TableCell>
                            ))}
                            <TableCell>
                                <Button variant="contained" onClick={(e) => onClickEdit(row)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default UserList;
