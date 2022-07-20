import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { H3BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import SvgBriefcase from "../../atoms/svg/SvgBriefcase";
import SvgMapPin from "../../atoms/svg/SvgMapPin";
import { IconInfoSection } from "../IconInfoSection/IconInfoSection";
import { User } from "../SearchResultItem/SearchResultItem";

type Props = {
  user: User;
};

const SimpleUserLayout = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "$2x",
    padding: "$3x",
    borderRadius: "$1x",
    backgroundColor: "$neutral-200"
});

const Name = styled("span", {
    ...H3BoldTabletAndUpStyle,
    color: "$neutral-700",
});

const InformationLayout = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: "$3x",
});

export const SimpleUser: React.FC<Props> = ({ user }) => {

    console.log(user);
    
    return (
    <>
    <SimpleUserLayout>
        <Name>{user.name}</Name>
        <InformationLayout>
        <IconInfoSection
            size="small"
            icon={SvgBriefcase}
            label="UI/UX"
        ></IconInfoSection>
        <IconInfoSection
            size="small"
            icon={SvgMapPin}
            label={user.location}
        ></IconInfoSection>
        </InformationLayout>
    </SimpleUserLayout>
    </>
    );
};