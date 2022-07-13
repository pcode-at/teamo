import React from "react";
import { styled, keyframes } from "@stitches/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import SvgMapPin from "../../atoms/svg/SvgMapPin";

type Props = {};

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "150px" },
});

const slideUp = keyframes({
  from: { height: "150px" },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: "$3x",
  width: "100%",
  backgroundColor: "$brand-100",
  boxShadow: `0 2px 10px $neutral-100`,
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: "hidden",
  marginTop: 1,

  "&:first-child": {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  "&:last-child": {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  "&:focus-within": {
    position: "relative",
    zIndex: 1,
    boxShadow: `0 0 0 2px $neutral-200`,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: "unset",
  display: "flex",
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "transparent",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 15,
  lineHeight: 1,
  color: "$brand-400",
  boxShadow: `0 1px 0 $neutral-200`,
  borderRadius: "$2x",
  marginBottom: "$1x",
  cursor: "pointer",
  '&[data-state="closed"]': { backgroundColor: "white" },
  '&[data-state="open"]': { backgroundColor: "white" },
  "&:hover": { backgroundColor: "$neutral-100" },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflowY: "auto",
  fontSize: 15,
  color: "$brand-400",
  backgroundColor: "$neutral-100",
  borderRadius: "$2x",

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.47, 0, 0.013, 1) forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.47, 0, 0.013, 1) forwards`,
  },
});

const MapPinLayout = styled("div", {
  display: "flex",
  width: "20px",
  height: "20px",
  color: "$brand-400",
});

const StyledContentText = styled("div", {
  padding: "15px 20px",
});

const AccordionTriggerLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2x",
});

const StyledChevron = styled(ChevronDownIcon, {
  color: "$brand-400",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

// Exports
export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef(function accordionTrigger(
  { children, ...props },
  forwardedRef
) {
  return (
    <StyledHeader>
      {/*@ts-ignore */}
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  );
});
export const AccordionContent = React.forwardRef(function accordionContent(
  { children, ...props },
  forwardedRef
) {
  return (
    <>
      {/*@ts-ignore */}
      <StyledContent {...props} ref={forwardedRef}>
        <StyledContentText>{children}</StyledContentText>
      </StyledContent>
    </>
  );
});

const CheckBoxInput = styled("input", {});
const CheckBoxLabel = styled("label", {});

export const DropDown: React.FC<Props> = ({}) => {
  return (
    <>
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1">
          {/*@ts-ignore */}
          <AccordionTrigger>
            <AccordionTriggerLayout>
              <MapPinLayout>
                <SvgMapPin></SvgMapPin>
              </MapPinLayout>
              Location
            </AccordionTriggerLayout>
          </AccordionTrigger>
          {/*@ts-ignore */}
          <AccordionContent>
            <CheckBoxInput
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value="Bike"
            />
            <CheckBoxLabel htmlFor="vehicle1"> I have a bike</CheckBoxLabel>
            <br />
            <CheckBoxInput
              type="checkbox"
              id="vehicle2"
              name="vehicle2"
              value="Car"
            />
            <CheckBoxLabel htmlFor="vehicle2"> I have a car</CheckBoxLabel>
            <br />
            <CheckBoxInput
              type="checkbox"
              id="vehicle3"
              name="vehicle3"
              value="Bike"
            />
            <CheckBoxLabel htmlFor="vehicle3"> I have a bike</CheckBoxLabel>
            <br />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
