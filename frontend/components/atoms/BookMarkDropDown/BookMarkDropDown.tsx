import React, { memo, useEffect } from "react";
import { styled } from "../../../stitches.config";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { keyframes } from "@stitches/react";
import SvgBookmark from "../svg/SvgBookmark";
import { useQuery } from "react-query";
import { getProjects } from "../../../utils/requests/project";
import { getBookmarks, updateBookmarks } from "../../../utils/requests/project";

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
  maxHeight: "45vh",

  overflowY: "auto",
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

const StyledItem = styled(DropdownMenuPrimitive.Item, {
  outline: "none",
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
  height: 30,
  width: 30,
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

type Props = {
  userId: string;
};

const CheckBoxInput = styled("input", {});

const CheckBoxLabel = styled("label", {});

const StyledCheckboxItem = styled("div", {});

const BookMarkDropDownPureComponent: React.FC<Props> = ({ userId }) => {
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: bookmarks, status: bookmarksStatus } = useQuery(
    ["bookmarks", userId],
    () => getBookmarks(userId),
    {
      enabled: isOpen,
    }
  );
  const { data: projects, status: projectsStatus } = useQuery(
    ["projects"],
    getProjects,
    {
      enabled: isOpen,
    }
  );
  useEffect(() => {
    if (bookmarksStatus === "success" && projectsStatus === "success") {
      setCheckedItems(bookmarks.map((bookmark) => bookmark.projectId));
    }
  }, [bookmarks, bookmarksStatus, projectsStatus]);

  if (bookmarksStatus === "loading" || projectsStatus === "loading" || !isOpen) {
    return (
      <>
        <Box>
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <IconButton aria-label="Customise options">
                <SvgBookmark></SvgBookmark>
              </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={5}>
              Loading...
            </DropdownMenuContent>
          </DropdownMenu>
        </Box>
      </>
    );
  }

  if (bookmarksStatus === "error" || projectsStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <Box>
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <IconButton aria-label="Customise options">
              <SvgBookmark></SvgBookmark>
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            {projects.map((project) => (
              <StyledCheckboxItem key={project.id}>
                <CheckBoxInput
                  type="checkbox"
                  id={project.id}
                  name={project.id}
                  value={projects.id}
                  checked={checkedItems.includes(project.id)}
                  onChange={(e) => {
                    let newItems = [...checkedItems];
                    if (e.target.checked) {
                      newItems.push(project.id);
                    } else {
                      newItems = checkedItems.filter((i) => i !== project.id);
                    }
                    setCheckedItems(newItems);
                    updateBookmarks(userId, newItems);
                  }}
                />
                <CheckBoxLabel htmlFor={project.id}>
                  {"  "}
                  {project.name}
                </CheckBoxLabel>
              </StyledCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    </>
  );
};

export default memo(BookMarkDropDownPureComponent);
