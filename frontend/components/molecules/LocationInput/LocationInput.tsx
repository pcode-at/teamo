import { keyframes } from "@stitches/react";
import React from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { getLocations } from "../../../utils/requests/user";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import SvgMapPin from "../../atoms/svg/SvgMapPin";
import { InputField } from "../../atoms/InputField/InputField";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";

type Props = {};

const LocationLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$neutral-200",
  borderRadius: "$1x",
  padding: "$1x 0 $1x $2x",
});

const LocationInputLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1x",
  borderRadius: "$2x",
});

export const LocationInput: React.FC<Props> = ({}) => {
  const [input, setInput] = React.useState("");
  const { data: locations, status } = useQuery("locations", getLocations);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(locations);

  return (
    <>
      <LocationInputLayout>
        <InputField
          // icon={SvgMapPin}
          required={true}
          inputType={"text"}
          onChange={(value) => {
            setInput(value);
          }}
          label="Location"
          value={input}
        ></InputField>

        <LocationLayout>
          {locations
            .filter(
              (location) =>
                location.location !== input &&
                location.location.toLowerCase().includes(input.toLowerCase())
            )
            .map((location) => (
              <Checkbox
                onChange={() => {
                  console.log(location.location);
                  return setInput(location.location);
                }}
              >
                {location.location}
              </Checkbox>
            ))}
        </LocationLayout>
      </LocationInputLayout>
    </>
  );
};
