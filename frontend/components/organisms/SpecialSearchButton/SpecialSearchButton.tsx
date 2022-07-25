import React from "react";
import { styled } from "../../../stitches.config";
import Link from "next/link";
import { BodyMediumTabletAndUpStyle } from "../../../utils/StyledParagraph";
import SvgSearch from "../../atoms/svg/SvgSearch";

type Props = {};

const LinkLayout = styled("a", {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "$1x",
    padding: "0",
    overflow: "hidden",

    backgroundColor: "$neutral-200",
});

const LinkTextLayout = styled("span", {
    ...BodyMediumTabletAndUpStyle,

    padding: "$2x $3x",
    color: "$neutral-500",
});

const IconLayout = styled("div", {
    display: "flex",
    width: "22px",
    height: "22px",
});

const LinkButtonLayout = styled("div", {
    ...BodyMediumTabletAndUpStyle,
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    padding: "$2x $4x",
    gap: "$2x",
    flexDirection: "row",

    backgroundColor: "$brand-400",
    color: "$neutral-100",
});


export const SpecialSearchButton: React.FC<Props> = ({}) => {
  return (
    <>
      <Link href="/search" passHref>
        <LinkLayout>
            <LinkTextLayout>
            You are looking for a perfectly matching member for your project?
            </LinkTextLayout>
            <LinkButtonLayout>
                <IconLayout>
                    <SvgSearch strokeWidth={1}></SvgSearch>
                </IconLayout>
                Search
            </LinkButtonLayout>
        </LinkLayout>
      </Link>
    </>
  );
};
