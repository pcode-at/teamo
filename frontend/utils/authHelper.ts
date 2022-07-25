import cookie from "js-cookie";

export async function login(identifier, password) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    }
  );
    console.log(response);
  if (response.status !== 201) {
    throw new Error("Invalid credentials");
  }

  const responseBody = await response.json();

  if (responseBody.data.accessToken && responseBody.data.refreshToken) {

    setCookie("accessToken", responseBody.data.accessToken, 1 / 96);
    setCookie(
      "refreshToken",
      responseBody.data.refreshToken,
      7
    );
    return true;
  }

  return false;
}

export async function logout() {
  cookie.remove("accessToken");
  cookie.remove("refreshToken");
}

export async function getAccessToken(): Promise<string> {
  if (cookie.get("accessToken")) {
    return cookie.get("accessToken");
  } else if (cookie.get("refreshToken")) {
    return await refreshAccessToken(cookie.get("refreshToken"));
  } else {
    return "";
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }
  );

  const responseBody = await response.json();
  if (responseBody.data.accessToken) {
    setCookie("accessToken", responseBody.data.accessToken, 1 / 96);
    return responseBody.data.accessToken;
  }

  return "";
}

function setCookie(name, accessToken: string, expirationTimeInDays) {
  cookie.set(name, accessToken, {
    expires: expirationTimeInDays,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
