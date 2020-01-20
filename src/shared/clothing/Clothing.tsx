import React, { FC } from 'react';
import { createFragmentContainer } from 'react-relay';
import { graphql } from "babel-plugin-relay/macro";
import { Clothing_image } from './__generated__/Clothing_image.graphql';

export const ClothingImage: FC<Clothing_image> = props => (
  <img className="clothing" src={props.imageUrl} alt={props.name} />
);

ClothingImage.defaultProps = {
  imageUrl: 'https://placeimg.com/60/60/arch',
  name: 'JS sweater'
};

createFragmentContainer(ClothingImage, {
  image: graphql`
    fragment Clothing_image on Clothing @relay(mask: false) {
      imageUrl
      name
    }
  `
});

