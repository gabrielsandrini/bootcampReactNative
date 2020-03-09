import React, {Component} from 'react';
import {View} from 'react-native';
import Proptypes from 'prop-types';
import api from '../../services/api';

// import { Container } from './styles';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
    };
  }

  async componentDidMount() {
    const {
      route: {
        params: {user},
      },
    } = this.props;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data});
  }

  render() {
    const {stars} = this.state;
    return <View />;
  }
}

User.propTypes = {
  route: Proptypes.shape({
    params: Proptypes.shape({
      user: Proptypes.shape({
        login: Proptypes.string,
      }),
    }),
  }).isRequired,
};
