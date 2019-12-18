import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../redux/actions/authActions';

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            errors: {},
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        // if the user is logged in, redirect to home because they shouldn't be able to register
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps){
        // if there are errors, then set the state
        if (nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(evt){
        const changed = evt.target.name;
        this.setState({[changed]: evt.target.value});
    }

    onSubmit(evt){
        evt.preventDefault();

        const newUser = {
            email: this.state.email,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
        }

        console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    }

    render(){
        const {errors} = this.state;
        return(
            <div>
                <h3>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Email</label>
                    <input name='email' type='text' value={this.state.email} onChange={this.onChange} />
                    <label>Username</label>
                    <input name='username' type='text' value={this.state.username} onChange={this.onChange} />
                    <label>First Name</label>
                    <input name='firstName' type='text' value={this.state.firstName} onChange={this.onChange} />
                    <label>Last Name</label>
                    <input name='lastName' type='text' value={this.state.lastName} onChange={this.onChange} />
                    <label>Password</label>
                    <input name='password' type='password' value={this.state.password} onChange={this.onChange} />

                    <input type='submit' value='Register' />
                    <p>Have an account already? Login <Link to='/login'>here</Link></p>
                </form>
            </div>
        )
    }
}

// get state from redux store and put it into this component's props
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
})

// withRouter allows us to redirect within an action
export default connect(mapStateToProps, {registerUser})(withRouter(Register));