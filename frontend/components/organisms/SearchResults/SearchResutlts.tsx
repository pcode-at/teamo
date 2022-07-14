import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField/InputField";
import SvgUser from "../../atoms/svg/SvgUser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SearchListItem } from "../../molecules/SearchListItem/SearchListItem";
import { Button } from "../../atoms/Button/Button";
import { SearchAddSkill } from "../../molecules/SearchAddSkill/SearchAddSkill";
import { searchElastic } from "../../../utils/requests/search";
import { useQuery } from "react-query";
import { SearchResultItem } from "../../molecules/SearchResultItem/SearchResultItem";
import { Item } from "../SearchBar/SearchBar";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

type Props = {
  items: {
    required: Item[];
    should: Item[];
    optional: Item[];
  };
};

const SearchResultsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gridGap: "$2x",
  padding: "$2x",
  width: "100%",
  height: "fit-content",
  maxHeight: "100%",
  overflowY: "scroll",
});

export const SearchResults: React.FC<Props> = ({ items }) => {
  let mappedItems = [];

  console.log(items);
  for (let key in items) {
    items[key].forEach((item, index) => {
      mappedItems.push({
        attribute: "skill",
        value: item.content.skillId,
        rating: item.content.rating,
        bucket: key,
      });
    });
  }

  const { data: results, status } = useQuery(["search", mappedItems], () => {
    return searchElastic({ parameters: [mappedItems] });
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(mappedItems);

  return (
    <>
      <SearchResultsLayout>
        {results.users.map((user, index) => {
          return (
            <>
              <SearchResultItem user={user} />
            </>
          );
        })}
      </SearchResultsLayout>
    </>
  );
};
