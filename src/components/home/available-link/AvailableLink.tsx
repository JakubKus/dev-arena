import 'components/home/available-link/available-link.scss';
import { selectGuest } from 'features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const AvailableLink: React.FC<{ text: string, path: string }> = ({ text, path }) => {
  const isGuest = useSelector(selectGuest);
  return isGuest
    ? <span className="available-link available-link--disabled">{text}</span>
    : <Link className="available-link" to={path}>{text}</Link>;
};
