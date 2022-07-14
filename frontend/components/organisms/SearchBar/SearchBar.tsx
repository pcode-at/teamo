import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField/InputField";
import SvgUser from "../../atoms/svg/SvgUser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SearchListItem } from "../../molecules/SearchListItem/SearchListItem";
import { Button } from "../../atoms/Button/Button";
import { SearchAddSkill } from "../../molecules/SearchAddSkill/SearchAddSkill";
import { DropDown } from "../../molecules/DropDown/DropDown";

// a little function to help us with reordering the result
const reorder = (list, source, destination) => {
  const [removed] = list[source.droppableId].splice(source.index, 1);
  list[destination.droppableId].splice(destination.index, 0, removed);

  return list;
};

const grid = 8;

export type Item = {
  id: string;
  content: {
    title: string;
    skillId: string;
    rating: number;
  };
};

type Props = {
  items: {
    required: Item[];
    should: Item[];
    optional: Item[];
  };
  setItems: (items: {
    required: Item[];
    should: Item[];
    optional: Item[];
  }) => void;
};

const SearchBarLayout = styled("div", {
  padding: "$5x",
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "$3x",
  minWidth: "450px",

  backgroundColor: "$brand-100",
});

const StyledList = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "$2x",
  borderRadius: "$1x",
  gap: "$2x",

  backgroundColor: "$neutral-100",
});

const StyledDroppableList = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: "$1x",
  minHeight: "50px",
  transition: "background-color 0.2s",

  backgroundColor: "$neutral-200",

  variants: {
    color: {
      true: {
        backgroundColor: "$neutral-200",
      },
      false: {
        backgroundColor: "$neutral-100",
      },
    },
  },
});

const StyledDroppableLabel = styled("div", {
  display: "flex",
  flexDirection: "row",
  margin: "$1x",

  fontSize: "$m",
  color: "$brand-400",
});

export const SearchBar: React.FC<Props> = ({ items, setItems }) => {
  const [itemCount, setItemCount] = React.useState(0);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    //@ts-ignore
    setItems(reorder(items, result.source, result.destination));
  }

  function updateSkillRating(id, rating) {
    setItems({
      required: items.required.map((item) =>
        item.id === id
          ? { ...item, content: { ...item.content, rating } }
          : item
      ),
      should: items.should.map((item) =>
        item.id === id
          ? { ...item, content: { ...item.content, rating } }
          : item
      ),
      optional: items.optional.map((item) =>
        item.id === id
          ? { ...item, content: { ...item.content, rating } }
          : item
      ),
    });
  }

  function deleteSkill(id: string) {
    setItems({
      required: items.required.filter((item) => item.id !== id),
      should: items.should.filter((item) => item.id !== id),
      optional: items.optional.filter((item) => item.id !== id),
    });
  }

  console.log(items);

  return (
    <>
      <SearchBarLayout>
        <DropDown></DropDown>
        <DragDropContext onDragEnd={onDragEnd}>
          <StyledList>
            <StyledDroppableLabel>Required</StyledDroppableLabel>
            <Droppable droppableId="required">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <StyledDroppableList color={items.required.length == 0}>
                    {items.required.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SearchListItem
                              item={item}
                              updateSkillRating={updateSkillRating}
                              deleteSkill={deleteSkill}
                            >
                              {item.content}
                            </SearchListItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </StyledDroppableList>
                </div>
              )}
            </Droppable>
            <StyledDroppableLabel>Should</StyledDroppableLabel>
            <Droppable droppableId="should">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <StyledDroppableList color={items.should.length == 0}>
                    {items.should.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SearchListItem
                              item={item}
                              updateSkillRating={updateSkillRating}
                              deleteSkill={deleteSkill}
                            >
                              {item.content}
                            </SearchListItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </StyledDroppableList>
                </div>
              )}
            </Droppable>
            <StyledDroppableLabel>Optional</StyledDroppableLabel>
            <Droppable droppableId="optional">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <StyledDroppableList color={items.optional.length == 0}>
                    {items.optional.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SearchListItem
                              item={item}
                              updateSkillRating={updateSkillRating}
                              deleteSkill={deleteSkill}
                            >
                              {item.content}
                            </SearchListItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </StyledDroppableList>
                </div>
              )}
            </Droppable>
            <SearchAddSkill
              addSearchSkill={(
                skill: string,
                id: string
              ): void => {
                setItems({
                  required: [
                    ...items.required,
                    {
                      id: `skill-${itemCount}`,
                      content: {
                        title: skill,
                        skillId: id,
                        rating: 8,
                      },
                    },
                  ],
                  should: items.should,
                  optional: items.optional,
                });
                setItemCount(itemCount + 1);
              }}
              items={items}
            ></SearchAddSkill>
          </StyledList>
        </DragDropContext>
      </SearchBarLayout>
    </>
  );
};
