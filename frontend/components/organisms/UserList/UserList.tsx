import React from "react";
import { styled } from "../../../stitches.config";
import { getAllUsers, getUser } from "../../../utils/requests/user";
import { useQuery } from "react-query";
import { SimpleUser } from "../../molecules/SimpleUser/SimpleUser";
import { Button } from "../../atoms/Button/Button";
import { H1BlackTabletAndUpStyle, H1BoldTabletAndUpStyle, H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {

};

const UserListLayout = styled("div", {
    padding: "$2x $6x $2x $6x"
})

const HeaderLayout = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "$4x 0 $2x 0"
});

const Headline = styled("h1", {
    ...H2BoldTabletAndUpStyle
});

const UserLayout = styled("div", {
    display: "grid",
    justifyContent: "space-between",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "$2x",
    cursor: "pointer"
});

const StyledLink = styled("a", {
  textDecoration: "none",
  color: "$neutral-700"
});

export const UserList: React.FC<Props> = ({ }) => {
    const router = useRouter();
  const { data: users, status } = useQuery("users", getAllUsers);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
    <UserListLayout>
        <HeaderLayout>
            <Headline>Users</Headline>
            <Button onClick={() => {
                router.push("user/create");
            }}>Create User</Button>
        </HeaderLayout>
        <UserLayout>
            { users.map(user => (
              <Link href={ "user/" + user.identifier } passHref>
                <StyledLink>
                <SimpleUser user={user}></SimpleUser>
                </StyledLink>
              </Link>
            )) }
        </UserLayout>
      </UserListLayout>
    </>
  );
};
