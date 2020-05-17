import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        {
          // Todo
        }
        <NavLink
          to="/"
          exact
          activeStyle={{
            borderBottom: '2px solid #FF872C',
            transition: 'border-width 3s linear',
          }}
        >
          Listagem
        </NavLink>
        <NavLink
          exact
          to="/import"
          activeStyle={{
            borderBottom: '2px solid #FF872C',
            transition: 'border-width 3s linear',
          }}
        >
          Importar
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
