import React from "react";
import { styled } from "../../../stitches.config";
import Link from "next/link";
import { BodySmallTabletAndUpStyle } from "../../../utils/StyledParagraph";
import SvgArrowLeft from "../../atoms/svg/SvgArrowLeft";

type Props = {
  href: string;
  label: string;
};

const BackLinkLayout = styled("a", {
  ...BodySmallTabletAndUpStyle,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$1x",
  color: "$neutral-500",
});

const LinkIconLayout = styled("div", {
  display: "flex",
  width: "18px",
  height: "18px",
});

export const BackLink: React.FC<Props> = ({ href, label }) => {
  return (
    <>
      <Link href={href} passHref>
        <BackLinkLayout>
          <LinkIconLayout>
            <SvgArrowLeft></SvgArrowLeft>
          </LinkIconLayout>
          {label}
        </BackLinkLayout>
      </Link>
    </>
  );
};
