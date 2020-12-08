import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes';
import 'components/home-button/home-button.scss';

export const HomeButton: React.FC<{ text?: string }> = ({ text = 'Home' }) => (
  <Link className="home-button" to={ROUTE.home}>◄ {text}</Link>
);
