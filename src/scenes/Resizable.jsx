import React, { Component } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import Form from '../components/Form';
import Count from '../components/Count';
import UserList from '../components/UserList';

class Resizable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: {},
            userToBeUpdated: {},
        }
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get('http://localhost:4000/user');
            console.log("data-----------", data);
            const count = await axios.get('http://localhost:4000/user/count');
            this.setState({ data, count: count.data });
        } catch (err) {
            console.log('errrrrr', err);
            this.setState({ data: [], count: {} });
        }
    }

    addUser = (user) => {
        console.log('data------', user);
        axios.post('http://localhost:4000/user', user).then(result => {
            console.log('res....', result);
            const { data, count: { created, updated } } = this.state;
            data.push(result.data);
            this.setState({
                data, userToBeUpdated: {
                    name: '',
                    age: '',
                    gender: '',
                    address: '',
                }, count: {
                    created: created + 1,
                    updated: updated,
                }
            });
        })
    }

    updateUser = (user) => {
        console.log('gaadn dfadunga::', user)
        axios.put('http://localhost:4000/user', user).then(result => {
            const { data, count: { created, updated } } = this.state;
            const findUser = data.findIndex(d => d['_id'] === user['_id']);
            data[findUser] = result.data;
            this.setState({
                data, userToBeUpdated: {
                    name: '',
                    age: '',
                    gender: '',
                    address: '',
                }, count: {
                    created: created,
                    updated: updated + 1,
                }
            });
        })
            .catch(err => console.log('eeeeeeeeeee', err))
    }

    onClickEdit = (userToBeUpdated) => {
        this.setState({ userToBeUpdated });
    }

    render() {
        const { data, count, userToBeUpdated } = this.state;
        return (
            <Container>
                <Grid container spacing={3}>
                    <Grid item>
                        <ResizableBox width={200} height={400} minContraints={[100, 100]} maxConstraints={[800, 800]}>
                            <Paper> <Count count={count} /> </Paper>
                        </ResizableBox>
                    </Grid>
                    <Grid item>
                        <ResizableBox width={900} height={400} minConstraints={[100, 400]} maxConstraints={[900, 800]}>
                            <Form addUser={this.addUser} updateUser={this.updateUser} userToBeUpdated={userToBeUpdated} key={JSON.stringify(userToBeUpdated)} />
                        </ResizableBox>
                    </Grid>
                    <Grid item xs={12}>
                        <ResizableBox width={1125} height={800} minConstraints={[100, 100]} maxConstraints={[1200, 800]}>
                            <UserList data={data} onClickEdit={this.onClickEdit} />
                        </ResizableBox>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Resizable;
