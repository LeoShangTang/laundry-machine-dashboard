export const handleLoginDefaultUser = async (uemail, upassword) => {
  try {
    const response = await fetch(
      `http://localhost:5000/userLivesIn/loginDefault`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uemail, upassword }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("defaultUser", JSON.stringify(data));
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (e) {
    console.error("Login failed", e.message);
    throw e;
  }
};
