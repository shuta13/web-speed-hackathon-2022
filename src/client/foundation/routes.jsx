import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import loadable from "@loadable/component";

import { CommonLayout } from "./layouts/CommonLayout";

import { Top } from "./pages/Top";
import { Odds } from "./pages/races/Odds";
import { RaceCard } from "./pages/races/RaceCard";
import { RaceResult } from "./pages/races/RaceResult";

const LTop = loadable(() => import("./pages/Top"), {
  fallback: <Top />,
});
const LRaceCard = loadable(() => import("./pages/races/RaceCard"), {
  fallback: <RaceCard />,
});
const LOdds = loadable(() => import("./pages/races/Odds"), {
  fallback: <Odds />,
});
const LRaceResult = loadable(() => import("./pages/races/RaceResult"), {
  fallback: <RaceResult />,
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
