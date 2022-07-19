import { Navbar } from "../components/organisms/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
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

const graph = {
  nodes: [
    { id: 1, label: "Node 1", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", title: "node 5 tootip text" },
  ],
  edges: [
    { from: 1, to: 2 },
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
    borderWidth: 5,
    borderWidthSelected: 10,
    size: 10,
    shape: "circle",
  },
  edges: {
    color: "#000000",
    selfReferenceSize: 10,
    selfReference: {
      angle: 0.7853981633974483,
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
    minVelocity: 0.75,
  },
  height: "500px",
};

const events = {
  select: function (event) {
    var { nodes, edges } = event;
  },
};

export async function getGroups() {
  return fetchData("project/skill-groupings/62c7fbb4aba3578343a8f9a0", "GET");
}

export default function Visualization() {
  const { data: data, status } = useQuery(["skill-groupings"], getGroups);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

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
