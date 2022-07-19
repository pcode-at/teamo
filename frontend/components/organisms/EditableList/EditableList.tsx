import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Button } from "../../atoms/Button/Button";
import Link from "next/link";
import { ListItem } from "../../molecules/ListItem/ListItem";

type Props = {
  listName: string;
  addFunction: () => void;
  editFunction: (id: string) => void;
  deleteFunction: (id: string) => void;
  items: {
    title: string;
    subtitle: string;
    id: string;
  }[];
};

const ListLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "$2x",
  gap: "$2x",
});

const HeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const ListTitle = styled("h1", {
  fontSize: "2.5rem",
});

const ListItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$2x",
  padding: "$2x",
  backgroundColor: "$neutral-100",
  borderRadius: "$1x",
  transition: "background-color 0.2s",
});

const StyledLink = styled("a", {
    color: "$neutral-800",
    textDecoration: "none",
});

export const EditableList: React.FC<Props> = ({
  listName,
  editFunction,
  deleteFunction,
  items,
}) => {
  return (
    <>
      <ListLayout>
        <HeaderLayout>
          <ListTitle>{listName}</ListTitle>
          <Button>Create project</Button>
        </HeaderLayout>
        <ListItems>
          {items.map((item) => (
            <Link key={item.id} href={`/project/${item.id}`} passHref>
              <StyledLink>
                <ListItem
                  title={item.title}
                  subtitle={item.subtitle}
                  editFunction={() => editFunction(item.id)}
                  deleteFunction={() => deleteFunction(item.id)}
                />
              </StyledLink>
            </Link>
          ))}
        </ListItems>
      </ListLayout>
    </>
  );
};
