import 'components/credits/credits.scss';
import { HomeButton } from 'components/home-button/HomeButton';
import React from 'react';

export const Credits: React.FC = () => <>
  <HomeButton />
  <p className="credits">
    {'Crafted with ❤ by Jakub Kuś: '}
    <a className="credits__link" href="https://github.com/JakubKus">github</a></p>
</>;
