import React from "react";
import { useQuery } from "react-query";
import { H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { styled } from "../../../stitches.config";
import Link from "next/link";
import { SimpleUser } from "../../molecules/SimpleUser/SimpleUser";
import { getAllUsers } from "../../../utils/requests/user";

type Props = {};

const ListLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$4x",
});

const ListTitle = styled("h2", {
  ...H2BoldTabletAndUpStyle,
});

const ListItems = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  width: "100%",
  gap: "$8x",
});

const StyledLink = styled("a", {
  textDecoration: "none",
  color: "$neutral-800",
});

export const PersonalBookmarks: React.FC<Props> = ({}) => {
  const { data: users, status } = useQuery(["bookmarks"], () => {
    return getAllUsers();
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <ListLayout>
        <ListTitle>Bookmarks</ListTitle>
        <ListItems>
          {users.map((user) => (
            <Link key={user.identifier} href={`/profile/${user.identifier}`} passHref>
              <StyledLink>
                <SimpleUser user={user} />
              </StyledLink>
            </Link>
          ))}
        </ListItems>
      </ListLayout>
    </>
  );
};
