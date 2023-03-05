import { Navbar } from "../components/organisms/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { styled, theme } from "../stitches.config";
import Graph from "react-graph-vis";
import { useQuery } from "react-query";

import { fetchData } from "../utils/requests/default";

const StyledDiv = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  width: "100%",
  height: "93vh",
  overflow: "hidden",
});

const nodes = [
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "2",
  },
];

let graph = {
  nodes: [
    { id: 1, label: "Node 1", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", title: "node 5 tootip text" },
  ],
  edges: [
    { from: 1, to: 2, label: "test" },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ],
};

const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    borderWidth: 0,
    borderWidthSelected: 3,
    size: 15,
    shape: "circle",
    color: {
      background: theme.colors["brand-400"],
      border: theme.colors["brand-500"],
      highlight: theme.colors["brand-300"],
    },
    font: {
      color: "#ffffff",
    },
  },
  edges: {
    color: theme.colors["brand-200"],
    selfReferenceSize: 10,
    selfReference: {
      angle: 0,
    },
    arrows: {
      to: false,
      from: false,
    },
    smooth: {
      forceDirection: "none",
    },
  },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18,
    },
    maxVelocity: 146,
    solver: "forceAtlas2Based",
    timestep: 0.35,
    stabilization: { iterations: 8 },
  },
  height: "500px",
};

const events = {
  select: function (event) {
    var { nodes, edges } = event;
  },
};

export async function getGroups() {
  return fetchData("project/skill/groupings/62c7fbb4aba3578343a8f9a0", "GET", 200);
}

export default function Visualization() {
  const { data: data, status } = useQuery(["skill-groupings"], getGroups);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  let graph = data;

  console.log(data);

  return (
    <>
      <Navbar></Navbar>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </>
  );
}
