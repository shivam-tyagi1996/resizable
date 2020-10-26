import React, { Component } from 'react';
import { Container, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ResizableBox } from 'react-resizable';
import tableHeaders from '../constants/employee';

class Resizable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            data: [],
        }
    }

    componentDidMount() {
        const data = [{
            name: "Faiyaz",
            age: "50",
            gender: "Female",
            address: 'Noida',
        }];
        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        return (
            <Container>
                <Grid container spacing={3}>
                    <Grid item>
                        <ResizableBox width={200} height={400} minContraints={[100, 100]} maxConstraints={[800, 800]}>
                            <Paper>xs=6</Paper>
                        </ResizableBox>
                    </Grid>
                    <Grid item>
                        <ResizableBox width={900} height={400} minConstraints={[100, 100]} maxConstraints={[800, 800]}>
                            <Paper>xs=6</Paper>
                        </ResizableBox>
                    </Grid>
                    <Grid item xs={12}>
                        <ResizableBox width={1125} height={800} minConstraints={[100, 100]} maxConstraints={[800, 800]}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {
                                            Object.keys(tableHeaders).map(header => (
                                                <TableCell>{tableHeaders[header]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.map(row => (
                                            <TableRow>
                                                {Object.keys(row).map(cell => (
                                                    <TableCell>{row[cell]}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </ResizableBox>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Resizable;
