import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Button } from "../../atoms/Button/Button";
import Link from "next/link";

type Props = {
  editFunction: () => void;
  deleteFunction: () => void;
  title: string;
  subtitle: string;
};

const ItemLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "$2x",
  padding: "$2x",
  backgroundColor: "$neutral-100",
  borderRadius: "$1x",
  transition: "background-color 0.2s",
});

const ItemTitle = styled("span", {
  fontSize: "$l",
});

const ItemSubtitle = styled("span", {
  fontSize: "$m",
});

const ItemActions = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$2x",
});

export const ListItem: React.FC<Props> = ({
  editFunction,
  deleteFunction,
  title,
  subtitle,
}) => {
  return (
    <>
      <ItemLayout>
        <ItemTitle>{title}</ItemTitle>
        <ItemSubtitle>{subtitle}</ItemSubtitle>
        <ItemActions></ItemActions>
      </ItemLayout>
    </>
  );
};
