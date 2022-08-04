import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  height: auto;
  width: 100%;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Image alt="Hero Image" src={url} width={1024} height={734} />;
};
