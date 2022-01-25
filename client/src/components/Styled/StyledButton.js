import { css } from "styled-components";

export const buttonbase = css`
  border-radius: 100px;
  border-width: 0px;
  color: rgb(255, 255, 255);
  display: inline-block;
  font-family: FuturaPT, sans-serif;
  font-size: 18px;
  font-weight: 700;
  height: 48px;
  min-width: 160px;
  padding: 0px 15px;
  outline: none;
  box-shadow: initial;
  transition: all 100ms linear 0s;
  line-height: 100%;
`;
// background: rgb(64, 62, 61);

export const primary = css`
  background: rgb(55, 118, 116);
`;

export const secondary = css`
  background: linear-gradient(
      rgba(255, 255, 255, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    rgb(251, 195, 97);
  background-blend-mode: soft-light, normal;
  color: rgb(64, 62, 61);
`;

export const cancel = css`
  color: rgb(64, 62, 61);
  background: rgb(230, 228, 227);
`

export const watchlist = css`
  background-color: #f9f8f7;
  color: rgb(55, 118, 116);
  border-color: rgb(230, 228, 227);
  border-style: solid;
  border-width: 1px;
  display: inline-block;
  padding: 10px 20px
  min-width: 80px;
  text-decoration: none;
  transition: all 100ms linear 0s;
`;

export const sm = css`
  font-size: 14px;
  font-weight: 700;
  height: 32px;
  min-width: 80px;
`;
