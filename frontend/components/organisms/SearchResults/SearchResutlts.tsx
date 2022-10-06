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
import Skeleton from "react-loading-skeleton";

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
  locations: string[];
};

const SearchResultsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "$2x",
  padding: "$2x",
  width: "100%",
  height: "fit-content",
  maxHeight: "100%",
  overflowY: "scroll",
});

export const SearchResults: React.FC<Props> = ({ items, locations }) => {
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
  locations.forEach((location) => {
    mappedItems.push({
      attribute: "location",
      value: location,
      rating: 0,
      bucket: "should",
    });
  });

  const { data: results, status } = useQuery(
    ["search", items, locations],
    () => {
      console.log(mappedItems);
      return searchElastic({ parameters: mappedItems });
    }
  );

  if (status === "loading") {
    return (
      <SearchResultsLayout>
        <Skeleton width="100%" height={220}></Skeleton>
        <Skeleton width="100%" height={220}></Skeleton>
        <Skeleton width="100%" height={220}></Skeleton>
      </SearchResultsLayout>
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(results);

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
