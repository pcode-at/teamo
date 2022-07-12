import Link from "next/link";
import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  icon: any;
  label: string;
  href?: string;
};

const IconInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$3x",
});

const IconLayout = styled("div", {
  display: "flex",
  width: "25px",
  height: "25px",
});

const InfoText = styled("p", {
  fontSize: "1.3rem",
});

const StyledLink = styled("a", {
  color: "$neutral-800",
  textDecoration: "none",
});

export const IconInfoSection: React.FC<Props> = ({ icon, label, href }) => {
  const Icon = icon;
  return (
    <>
      <IconInfoLayout>
        <IconLayout>
          <Icon></Icon>
        </IconLayout>
        <InfoText>
          {href ? (
            <Link href={href} passHref>
              <StyledLink>
                <InfoText>{label}</InfoText>
              </StyledLink>
            </Link>
          ) : (
            <InfoText>{label}</InfoText>
          )}
        </InfoText>
      </IconInfoLayout>
    </>
  );
};
