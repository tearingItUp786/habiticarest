// @flow
// TODO: WRITE TESTS FOR THIS COMPONENT
// TODO: MOVE OUT STYLING FOR TOAST NOTIFICATION TO OWN COMPONENT

import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Transition } from 'react-spring';
import Label from './Label';
import { setCredientals, formattedErrorMessage, setOptions } from './config';
import { Wrapper, Form, FieldSet, SubmitButton, HabitLogo } from './styling/Login';

class Login extends Component<LoginProps, LoginState> {
  state = {
    username: '',
    password: '',
    id: '',
    apiToken: '',
    tokenLogin: false
  };

  handleSubmit = async (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const { username, password, id, apiToken, tokenLogin } = this.state;

    try {
      if (tokenLogin) {
        await setOptions(id, apiToken);
      } else {
        await setCredientals(username, password);
      }
      this.props.history.push('./dashboard');
    } catch (error) {
      toast.error(formattedErrorMessage(error.name), {
        autoClose: 15000
      });
    }
  };

  handleFieldChange = (evt: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { id, value } = evt.currentTarget;
    this.setState({
      [id]: value
    });
  };

  handleCheckBox = (evt: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = evt;
    const value = currentTarget.type === 'checkbox' ? currentTarget.checked : currentTarget.value;
    const { name } = currentTarget;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password, tokenLogin, id, apiToken } = this.state;
    const logo = [
      {
        key: 'habit_logo',
        src: './assets/habit_logo.png'
      }
    ];

    let formFields = (
      <Fragment>
        <FieldSet>
          <Label htmlFor="email">Username</Label>
          <input
            id="username"
            type="text"
            name="email"
            placeholder="Your Username"
            onChange={this.handleFieldChange}
            value={username}
          />
        </FieldSet>
        <FieldSet>
          <Label htmlFor="password">Password</Label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={this.handleFieldChange}
            value={password}
          />
        </FieldSet>
      </Fragment>
    );

    if (tokenLogin) {
      formFields = (
        <Fragment>
          <FieldSet>
            <Label htmlFor="uid">UID</Label>
            <input id="id" type="text" name="uid" placeholder="Your UID" onChange={this.handleFieldChange} value={id} />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="apiToken">Api Token</Label>
            <input
              id="apiToken"
              type="password"
              name="apiToken"
              placeholder="Your API Token"
              onChange={this.handleFieldChange}
              value={apiToken}
            />
          </FieldSet>
        </Fragment>
      );
    }

    const element = (
      <Wrapper>
        <article>
          <Transition
            keys={logo.map(item => item.key)}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {logo.map(item => styles => <HabitLogo style={styles} src={item.src} alt="Habit Logo" />)}
          </Transition>
          <Form onSubmit={this.handleSubmit}>
            {formFields}
            <FieldSet style={{ paddingTop: '20px' }}>
              <Label style={{ textAlign: 'center' }} htmlFor="tokenLogin">
                Use Token Login
              </Label>
              <input
                style={{ width: '20px', height: '20px', margin: 'auto' }}
                name="tokenLogin"
                type="checkbox"
                checked={this.state.tokenLogin}
                onChange={this.handleCheckBox}
              />
            </FieldSet>
            <SubmitButton type="submit" value="Login" />
          </Form>
        </article>
      </Wrapper>
    );

    return element;
  }
}

export default Login;
