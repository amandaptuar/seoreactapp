async function test() {
  try {
    const age = 22;
    const gender = 'male';

    const apiResponse = await fetch("https://limitless-mub2.onrender.com/api/v1/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: age,
        gender: gender,
        locale: "en"
      })
    });

    console.log("Status:", apiResponse.status);
    const data = await apiResponse.json();
    console.log("Data:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
