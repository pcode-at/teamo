import { getAccessToken } from "../authHelper";

export async function getSkills() {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill`,
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

export async function searchElastic(search) {
  const accessToken = await getAccessToken();
console.log(search);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/elastic/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(search),
    }
  );

  if (response.status !== 201) {
    throw new Error("Invalid credentials");
  }

  const responseBody = await response.json();

  return responseBody.data;
}
