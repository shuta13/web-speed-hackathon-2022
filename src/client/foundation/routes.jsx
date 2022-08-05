import React from "react";
import Router from "preact-router";
import loadable from "@loadable/component";

import { Container } from "./components/layouts/Container";
import { CommonLayout } from "./layouts/CommonLayout";

import Top from "./pages/Top";
import RaceCard from "./pages/races/RaceCard";
import Odds from "./pages/races/Odds";
import RaceResult from "./pages/races/RaceResult";

// const Top = loadable(() => import("./pages/Top"), {
//   fallback: <Container pending />,
// });
// const RaceCard = loadable(() => import("./pages/races/RaceCard"), {
//   fallback: <Container pending />,
// });
// const Odds = loadable(() => import("./pages/races/Odds"), {
//   fallback: <Container pending />,
// });
// const RaceResult = loadable(() => import("./pages/races/RaceResult"), {
//   fallback: <Container pending />,
// });

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <Router>
      <Top default path="/" />
      <Top path="/:date" />
      <RaceCard path="races/:raceId/race-card" />
      <Odds path="races/:raceId/odds" />
      <RaceResult path="races/:raceId/result" />
    </Router>
  );
};
