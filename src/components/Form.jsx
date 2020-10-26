import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props);
        const { userToBeUpdated: { name, age, gender, address } } = props;
        console.log('name::::', name)
        this.state = {
            name,
            age,
            gender,
            address,
        }
    }

    changeName = (e) => {
        this.setState({ name: e.target.value });
    }

    changeAge = (e) => {
        console.log('+++++++++++++', isNaN(e.target.value))
        if (!isNaN(e.target.value)) {
            this.setState({ age: e.target.value });
        }
    }

    changeAddress = (e) => {
        this.setState({ address: e.target.value });
    }

    changeGender = (e) => {
        console.log('----------------', e.target.value);
        this.setState({ gender: e.target.value })
    }

    isButtonDisabled = () => {
        const { name, age, gender, address } = this.state;
        console.log('name', name, 'age', age, 'gnedr', gender, 'addr', address)
        if (name && name.length >= 3 && age && gender && address) {
            return false;
        }
        return true;
    }

    onSubmit = () => {
        const { addUser, userToBeUpdated, updateUser } = this.props;
        const { name, age, address, gender } = this.state;
        if (!userToBeUpdated['_id']) {
            addUser({
                name,
                age,
                address,
                gender,
            })
        } else {
            updateUser({
                name,
                age,
                address,
                gender,
                _id: userToBeUpdated['_id']
            })
        }
    }

    render() {
        const { name, age, gender, address } = this.state;
        const { userToBeUpdated } = this.props;
        console.log(age, '**********8')
        return (
            <Container>
                <FormControl>
                    <Grid container justify="center">
                        <Grid item>
                            <TextField
                                id="outlined-full-width"
                                label="Name"
                                style={{ margin: 20 }}
                                placeholder="Name (atleast 3 characters)"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={name}
                                required
                                onChange={this.changeName}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Age"
                                style={{ margin: 20 }}
                                placeholder="Age (must be a number)"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={age}
                                required
                                onChange={this.changeAge}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Address"
                                style={{ margin: 20 }}
                                placeholder="Address"
                                fullWidth
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={address}
                                onChange={this.changeAddress}
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={this.changeGender}>
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Button variant="contained" disabled={this.isButtonDisabled()} onClick={this.onSubmit}>{userToBeUpdated['_id'] ? 'Update' : 'Add'}</Button>
                    </Grid>
                </FormControl>
            </Container>
        )
    }
}

Form.propTypes = {
    user: PropTypes.object,
    userToBeUpdated: PropTypes.string,
}

Form.defaulProps = {
    user: {
        name: '',
        age: '',
        gender: '',
        address: '',
        _id: '',
    },
}

export default Form;
