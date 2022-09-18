const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "99c4fd4bcf69f8977aa59e7165e20c67";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(`Temperature at ${weatherData.name} is: ${temp}°C`);
      var description = weatherData.weather[0].description;
      description = description.toLocaleUpperCase();
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(description);
      res.write(`<h1>The weather is currently ${description}</h1>`);
      res.write(
        `<h1>The temperature in ${weatherData.name} is ${temp} degree Celsius</h1>`
      );
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});
const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log(`Server is running at 3000`);
});
