module.exports = (app) => {
  const https = require("https");

  const accessToken = "YOUR_ACCESS_TOKEN";
  const options = {
    host: "api.linkedin.com",
    path: "/v2/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "cache-control": "no-cache",
      "X-Restli-Protocol-Version": "2.0.0",
    },
  };

  const profileRequest = https.request(options, function (res) {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const profileData = JSON.parse(data);
      console.log(JSON.stringify(profileData, 0, 2));
    });
  });
  profileRequest.end();
};
