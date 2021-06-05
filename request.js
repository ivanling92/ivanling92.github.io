document.querySelector("#ipText").innerHTML = "Running Script...";
    let req = require("request");
    
    let data = {
  "Inputs": {
    "input1": {
      "ColumnNames": [
        "Month",
        "LD_MYR",
        "DC_NETT_DOWN",
        "DC_GROSS_DOWN",
        "GRID_DOWN",
        "Percipitation"
      ],
      "Values": [
        [
          "0",
          "0",
          "0",
          "0",
          "0",
          "0"
        ],
        [
          "0",
          "0",
          "0",
          "0",
          "0",
          "0"
        ]
      ]
    }
  },
  "GlobalParameters": {}
}
    
    
    var url = "https://ussouthcentral.services.azureml.net/workspaces/b473206723fd4cf4a8b46689a1f76dbe/services/c35281ab15da49a58eb0f2710c55ce57/execute?api-version=2.0&format=swagger";
    var apiKey = "49hP8LfT5KRE3s8EYzfdrXuHKC1E3rn/R6KabsT4EGb4kUSl1xH5lG7JOyEpJiL+3w9j9aBuCHrO9yxMDMWrpA==";
    
    
    const options = {
    uri: url,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
    },
    body: JSON.stringify(data)
    }
    
    req(options, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        console.log(body);
        document.querySelector("#ipText").innerHTML = body;
    } else {
        console.log("The request failed with status code: " + res.statusCode);
    }
});