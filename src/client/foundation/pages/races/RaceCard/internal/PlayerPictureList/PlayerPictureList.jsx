import React, { useRef } from "react";
import styled from "styled-components";
import { useIntersectionObserver } from "usehooks-ts";

import { Stack } from "../../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../../components/media/TrimmedImage";
import { Color, FontSize, Space } from "../../../../../styles/variables";

const PlayerNumber = styled.span`
  border: 1px solid ${Color.mono[900]};
  font-weight: bold;
  height: 24px;
  text-align: center;
  width: 24px;
`;

const PlayerName = styled.span`
  font-size: ${FontSize.SMALL};
`;

/**
 * @typedef ItemProps
 * @property {number} number
 * @property {string} image
 * @property {string} name
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ image, name, number }) => {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  return (
    <Stack gap={Space * 1}>
      <div ref={ref}>
        {isVisible && (
          <TrimmedImage
            name={`${name}選手のプロフィール写真`}
            height={100}
            src={image}
            width={100}
          />
        )}
        <Stack horizontal alignItems="center" gap={Space / 2} wrap="wrap">
          <PlayerNumber>{number}</PlayerNumber>
          <PlayerName>{name}</PlayerName>
        </Stack>
      </div>
    </Stack>
  );
};

export const PlayerPictureList = ({ children }) => {
  return (
    <Stack horizontal gap={Space * 2} wrap="wrap">
      {children}
    </Stack>
  );
};
PlayerPictureList.Item = Item;
