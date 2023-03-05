import { styled } from "../stitches.config";
import { Navbar } from "../components/organisms/Navbar/Navbar";
import { SearchBar } from "../components/organisms/SearchBar/SearchBar";
import React from "react";
import { SearchResults } from "../components/organisms/SearchResults/SearchResutlts";

const SearchLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  width: "100%",
  height: "89vh",
  overflow: "hidden",
});

export default function Home() {
  const [items, setItems] = React.useState({
    required: [],
    should: [],
    optional: [],
  });
  const [locations, setLocations] = React.useState([]);
  return (
    <>
      <Navbar></Navbar>
      <SearchLayout>
        <SearchBar items={items} setItems={setItems} setLocations={setLocations}></SearchBar>
        <SearchResults items={items} locations={locations}></SearchResults>
      </SearchLayout>
    </>
  );
}
