import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { styled } from "../../../stitches.config";
import {
  createSkill,
  deleteSkill,
  getSkills,
} from "../../../utils/requests/skills";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import SvgCross from "../../atoms/svg/SvgCross";

type Props = {};

const SearchAddSkillLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: "$2x",
  marginTop: "$2x",
  padding: "$4x $6x $2x $6x",

  backgroundColor: "$neutral-100",
});

const AddSkillInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  gap: "$2x",
});

const SkillListLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  alignItems: "left",
  width: "100%",
  gap: "$2x",
  padding: "$2x $6x",
  borderRadius: "$2x",
  backgroundColor: "$neutral-100",
  marginTop: "$2x",
  overflow: "auto",
});

const SkillListItemLayout = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "$1x",
  padding: "$1x $2x",
  border: "none",

  backgroundColor: "$brand-100",
  color: "$brand-500",
  fontSize: "1rem",
  fontWeight: "bold",
  textAlign: "left",
  textDecoration: "none",
  transition: "all 0.2s",
});

const SkillItemCloseLayout = styled("button", {
  display: "flex",
  width: "30px",
  height: "30px",
  padding: "4px",
  border: "none",

  backgroundColor: "transparent",
  color: "$brand-500",
  transition: "all 0.2s",
  cursor: "pointer",

  "&:hover": {
    transform: "rotate(90deg)",
  },
});

export const SkillEditList: React.FC<Props> = ({}) => {
  const [skill, setSkill] = React.useState("");
  const { data: skills, status } = useQuery("skills", getSkills, {});
  const queryClient = useQueryClient();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <SearchAddSkillLayout>
        <AddSkillInfoLayout>
          <InputField
            inputType={"text"}
            value={skill}
            onChange={(value) => {
              setSkill(value);
            }}
            label={"Type skill name"}
            showLabel={false}
            size="fitParent"
          ></InputField>
          <Button
            onClick={async () => {
              const skillAddResponse = await createSkill({ name: skill });

              if (skillAddResponse) {
                queryClient.invalidateQueries("skills");
              }
              setSkill("");
            }}
          >
            Add skill
          </Button>
        </AddSkillInfoLayout>
      </SearchAddSkillLayout>
      <SkillListLayout>
        {skills.map((currentSkill) => (
          <SkillListItemLayout key={currentSkill.id} onClick={() => {}}>
            {currentSkill.name}
            <SkillItemCloseLayout
              onClick={async () => {
                const skillDeleteResponse = await deleteSkill(currentSkill.id);

                if (skillDeleteResponse) {
                  queryClient.invalidateQueries("skills");
                }
              }}
            >
              <SvgCross></SvgCross>
            </SkillItemCloseLayout>
          </SkillListItemLayout>
        ))}
      </SkillListLayout>
    </>
  );
};
