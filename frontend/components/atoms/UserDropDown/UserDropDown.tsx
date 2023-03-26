import React from "react";
import { styled } from "../../../stitches.config";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { keyframes } from "@stitches/react";
import SvgUser from "../svg/SvgUser";
import { BodyDefaultTabletAndUpStyle } from "../../../utils/StyledParagraph";
import SvgArrowLeft from "../svg/SvgArrowLeft";
import SvgSettings from "../svg/SvgSettings";
import Link from "next/link";
import { logout } from "../../../utils/authHelper";
import { useRouter } from "next/router";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = {
  minWidth: 200,
  backgroundColor: "white",
  borderRadius: "$2x",
  padding: "$1x",
  margin: "0 $2x",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
};

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  ...contentStyles,
  padding: "$2x",
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

function Content({ children, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
}

const StyledSubContent = styled(DropdownMenuPrimitive.SubContent, {
  ...contentStyles,
});

const StyledItem = styled(DropdownMenuPrimitive.Item, {
  outline: "none",
});

const StyledItemLink = styled("a", {
  ...BodyDefaultTabletAndUpStyle,

  color: "$neutral-800",
  borderRadius: "$1x",
  display: "flex",
  alignItems: "center",
  padding: "$1x",
  position: "relative",
  border: "none",
  gap: "$1x",
  cursor: "pointer",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$brand-100",
  },

  "&[data-disabled]": {
    color: "$neutral-400",
    pointerEvents: "none",
  },
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = Content;
export const DropdownMenuItem = StyledItem;

// Your app...
const Box = styled("div", {});

const IconButton = styled("button", {
  fontFamily: "inherit",
  border: "none",
  borderRadius: "100%",
  boxSizing: "border-box",
  height: 40,
  width: 40,
  padding: "$1x",
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "center",
  color: "$brand-500",
  backgroundColor: "$neutral-100",
  boxShadow: `0 2px 10px $color$neutral-800`,
  outline: "none",
  transition: "all 0.2s",
  "&:hover": { backgroundColor: "$brand-500", color: "$neutral-100" },
});

type Props = {};

const IconLayout = styled("div", {
  display: "flex",
  width: 20,
  height: 20,
});

export const UserDropDown: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <>
      <Box>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton aria-label="Customise options">
              <SvgUser />
            </IconButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent sideOffset={5}>
            <DropdownMenuItem>
              <Link href="/profile" passHref>
                <StyledItemLink>
                  <IconLayout>
                    <SvgUser></SvgUser>
                  </IconLayout>
                  PROFILE
                </StyledItemLink>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/user" passHref>
                <StyledItemLink>
                  <IconLayout>
                    <SvgSettings></SvgSettings>
                  </IconLayout>
                  ADMIN - USERS
                </StyledItemLink>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/skill" passHref>
                <StyledItemLink>
                  <IconLayout>
                    <SvgSettings></SvgSettings>
                  </IconLayout>
                  ADMIN - SKILLS
                </StyledItemLink>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              <StyledItemLink>
                <IconLayout>
                  <SvgArrowLeft></SvgArrowLeft>
                </IconLayout>
                LOGOUT
              </StyledItemLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    </>
  );
};
