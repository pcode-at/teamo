import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField/InputField";
import SvgUser from "../../atoms/svg/SvgUser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SearchListItem } from "../../molecules/SearchListItem/SearchListItem";
import { Button } from "../../atoms/Button/Button";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

type Props = {};

const SearchBarLayout = styled("div", {
  padding: "$5x",
  height: "100%",

  backgroundColor: "$neutral-200",
});

const StyledList = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "$2x",
  borderRadius: "$2x",

  backgroundColor: "$neutral-100",
});

export const SearchBar: React.FC<Props> = ({}) => {
  const [items, setItems] = React.useState([]);
  const [newSkillName, setNewSkillName] = React.useState("");
  const [newSkillRating, setNewSkillRating] = React.useState("");
  const [itemCount, setItemCount] = React.useState(0);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    //@ts-ignore
    setItems(reorder(items, result.source.index, result.destination.index));
  }

  function updateSkillRating(id, rating) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, content: { ...item.content, rating } }
          : item
      )
    );
  }

  console.log(items);

  return (
    <>
      <SearchBarLayout>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <StyledList>
                  {items.map((item, index) => (
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
                          >
                            {item.content}
                          </SearchListItem>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </StyledList>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <InputField
          inputType={"text"}
          label={"Name"}
          value={newSkillName}
          onChange={setNewSkillName}
        ></InputField>
        <InputField
          inputType={"number"}
          label={"Rating"}
          value={newSkillRating}
          onChange={setNewSkillRating}
        ></InputField>
        <Button
          onClick={() => {
            setItems([
              ...items,
              {
                id: "item-" + itemCount,
                content: {
                  title: newSkillName,
                  rating: newSkillRating,
                },
              },
            ]);
            setNewSkillName("");
            setNewSkillRating("");
            setItemCount(itemCount + 1);
          }}
        >
          Add Skill to list
        </Button>
      </SearchBarLayout>
    </>
  );
};
