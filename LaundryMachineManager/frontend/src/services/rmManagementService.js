export const getRmDashBoardUsers = async (
    name = "",
    email = "",
    buildingName = "",
    cardNumber = "",
    orderBy = "",
    feedbackFilter = false
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5001/userLivesIn/rmDashBoard`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, buildingName, cardNumber, orderBy, feedbackFilter }),
        }
      );
      const data = await response.json();
      console.log("RM dashboard response data:", data);
  
      if (response.ok) {
        if (feedbackFilter) {
          return data.map((resp) => {
            return {
              uid: resp.uid,
              name: resp.uname,
              email: resp.uemail,
              bid: resp.bid || "N/A",
              buildingName: resp.bname || "N/A",
              buildingAddress: resp.address || "N/A", 
              card: resp.cid || "N/A",
            };
          });
        } else {
          return data.map((resp) => {
            return {
              uid: resp.uid,
              name: resp.uname,
              email: resp.uemail,
              bid: resp.campusresidence.bid || "N/A",
              buildingName: resp.campusresidence.bname || "N/A",
              buildingAddress: resp.campusresidence.address || "N/A",
              card: resp.loadswashingcard[0]?.cid || "N/A",
            };
          });
        }
      } else {
        throw new Error(data.message || "Failed to fetch users.");
      }
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
      throw err;
    }
  };


export const getRmDashBoardMachines = async (
  lid,
  bname,
  brand,
  model,
  address,
  washing_status
) => {
  try {
    const response = await fetch(
      `http://localhost:5001/laundryMachines/rm-machines`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lid,
          bname,
          brand,
          model,
          address,
          washing_status,
        }),
      }
    );

    const data = await response.json();
    console.log("RM dashboard response data:", data);

    if (response.ok) {
      return data.map((resp) => {
        return {
          lid: resp.lid,
          bname: resp.campusresidence?.bname,
          brand: resp.brand,
          model: resp.model,
          address: resp.campusresidence?.address,
          washing_status: resp.washing_status,
        };
      });
    } else {
      throw new Error("Failed to fetch data from the server");
    }
  } catch (err) {
    console.error("Request failed", err.message);
    throw err;
  }
};

export const getMachineCountsByBuilding = async () => {
  try {
    const response = await fetch(
      `http://localhost:5001/laundryMachines/machineCountsByBuilding`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log("Machine counts by building:", data);

    if (response.ok) {
      return data.map((building) => ({
        bid: building.bid,
        bname: building.bname,
        address: building.address,
        machine_count: building.machine_count,
      }));
    } else {
      throw new Error(data.error || "Failed to fetch machine counts.");
    }
  } catch (err) {
    console.error("Failed to fetch machine counts:", err.message);
    throw err;
  }
};

export const getFrequentlyUsedMachines = async () => {
  try {
    const response = await fetch(
      `http://localhost:5001/laundryMachines/frequentlyUsedMachines`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log("Frequently used machines: ", data);

    if (response.ok) {
      return data.map((building) => ({
        bid: building.bid,
        bname: building.bname,
        lid: building.lid,
        usage_count: building.usage_count,
      }));
    } else {
      throw new Error(data.error || "Failed to fetch frequently used machines.");
    }
  } catch (err) {
    console.error("Failed to fetch frequently used machines:", err.message);
    throw err;
  }
};

