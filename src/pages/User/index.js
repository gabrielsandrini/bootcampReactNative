import React, {Component} from 'react';
import Proptypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Name,
  Bio,
  Avatar,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

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
    const {
      route: {
        params: {user},
      },
    } = this.props;

    const {stars} = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
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
