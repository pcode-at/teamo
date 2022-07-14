import { getAccessToken } from "../authHelper";

export async function getUser() {
  const accessToken = await getAccessToken();
  console.log(accessToken);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }

  const responseBody = await response.json();

  return responseBody.data;
}

export async function getLocations(){
  const accessToken = await getAccessToken();
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/locations`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }

  const responseBody = await response.json();

  return responseBody.data;
}