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
    id: string;
    content: {
      title: string;
      skillId: string;
      rating: string;
    };
  }[];
};

const SearchResultsLayout = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: "$2x",
    padding: "$2x",
    width: "100%",
    height: "100%",
});

export const SearchResults: React.FC<Props> = ({ items }) => {
  let mappedItems = items.map((item, index) => {
    return {
      attribute: "skill",
      value: item.content.skillId,
      rating: item.content.rating,
      required: false,
    };
  });

  const { data: results, status } = useQuery(["search", mappedItems], () => {
    return searchElastic({ parameters: mappedItems });
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(results);

  return (
    <>
      <SearchResultsLayout>
        {results.users.map((user, index) => {
            console.log(user);
          return (<>
            <SearchResultItem user={user} />
          </>)
        })}
      </SearchResultsLayout>
    </>
  );
};
