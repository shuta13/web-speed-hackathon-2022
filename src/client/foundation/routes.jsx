import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import loadable from "@loadable/component";
import { Container } from "./components/layouts/Container";

import { CommonLayout } from "./layouts/CommonLayout";

const LTop = loadable(() => import("./pages/Top"), {
  fallback: <Container pending />,
});
const LRaceCard = loadable(() => import("./pages/races/RaceCard"), {
  fallback: <Container pending />,
});
const LOdds = loadable(() => import("./pages/races/Odds"), {
  fallback: <Container pending />,
});
const LRaceResult = loadable(() => import("./pages/races/RaceResult"), {
  fallback: <Container pending />,
});

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route index element={<LTop />} />
        <Route element={<LTop />} path=":date" />
        <Route path="races/:raceId">
          <Route element={<LRaceCard />} path="race-card" />
          <Route element={<LOdds />} path="odds" />
          <Route element={<LRaceResult />} path="result" />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
