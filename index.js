import express from "express";
const PORT = process.env.PORT || 8080;
import * as cheerio from "cheerio";
import fetch from "node-fetch";

async function getUFC() {
  try {
    // Fetch data from URL and store the response into a const
    const response = await fetch(
      "https://www.ufc.com/events#events-list-upcoming"
    );
    // Convert the response into text
    const body = await response.text();

    // Load body data
    const $ = cheerio.load(body);
    // Create empty array
    const items = [];

    $("#events-list-upcoming")
      .find(".l-listing__group > li.l-listing__item")
      .map((i, el) => {
        // Select info
        let infoContainer = $(el).find(".c-card-event--result__headline");
        let imageContainer = $(el).find(".c-carousel__item:first");
        let locationContainer = $(el).find("p.address");

        let match = infoContainer.text();
        let link = infoContainer.find("a").attr().href;
        let image = imageContainer
          .find("img.image-style-event-results-athlete-headshot:first")
          .attr("src");
        let image2 = imageContainer
          .find("img.image-style-event-results-athlete-headshot:last")
          .attr("src");
        let city = locationContainer.find("span.locality").text();
        let location = locationContainer.find("span.country").text();

        // Push the data into the items array
        items.push({
          match,
          link,
          image,
          image2,
          city,
          location,
        });
      });

    return items;
  } catch (error) {
    console.log(error);
  }
}

async function getBellator() {
  try {
    // Fetch data from URL and store the response into a const
    const response = await fetch("https://www.bellator.com/event");
    // Convert the response into text
    const body = await response.text();

    // Load body data
    const $ = cheerio.load(body);
    // Create empty array
    const items = [];

    // Selecting Each col-12 class name and iterate through the list
    $(".lIgHP > .hUzahr > .ceEIQG > .dnctcc").map((i, el) => {
      // Select rank, points, first name, last name, team and photo
      const matchContainer = $(el).find(".kRNiwu");

      const match = matchContainer.find("p:nth-child(2)").text();
      const location = $(el).find(".kRNiwu").find("p:nth-child(4)").text();
      const link = $(el).find("a").attr().href;
      const image = $(el).find(".YJkmu").attr("src");

      // Push the data into the items array
      items.push({
        match,
        link,
        location,
        image,
      });
    });

    return items;
  } catch (error) {
    console.log(error);
  }
}

async function getUFCFighter(name) {
  try {
    // Fetch data from URL and store the response into a const
    var url = "https://www.ufc.com/athlete/" + name;
    const response = await fetch(url);
    // Convert the response into text
    const body = await response.text();

    // Load body data
    const $ = cheerio.load(body);
    // Create empty array
    const items = [];

    const division = $(".hero-profile__division-title").text();
    const pfp = $(".hero-profile__tag:nth-child(2)").text();
    const nickname = $("p.hero-profile__nickname").text();
    const fighterName = $("h1.hero-profile__name").text();
    const record = $("p.hero-profile__division-body").text();
    const winStreak = $(
      ".hero-profile__stat:first > .hero-profile__stat-numb"
    ).text();
    const winKnock = $(
      ".hero-profile__stat:nth-child(2) > .hero-profile__stat-numb"
    ).text();
    const titleDefense = $(
      ".hero-profile__stat:nth-child(3) > .hero-profile__stat-numb"
    ).text();
    const strikeLand = $(".stats-records.stats-records--two-column:first")
      .find("dd.c-overlap__stats-value:first")
      .text();
    const strikeAttempt = $(".stats-records.stats-records--two-column:first")
      .find("dd.c-overlap__stats-value:last")
      .text();
    const takedownLand = $(
      ".stats-records.stats-records--two-column:nth-child(3)"
    )
      .find("dd.c-overlap__stats-value:first")
      .text();
    const takedownAttempt = $(
      ".stats-records.stats-records--two-column:nth-child(3)"
    )
      .find("dd.c-overlap__stats-value:last")
      .text();

    // Push the data into the items array
    items.push({
      division,
      pfp,
      nickname,
      fighterName,
      record,
      winStreak,
      winKnock,
      titleDefense,
      strikeLand,
      strikeAttempt,
      takedownLand,
      takedownAttempt,
    });

    return items;
  } catch (error) {
    console.log(error);
  }
}

const app = express();
app.listen(PORT);

app.get("/bellator", async (req, res) => {
  const bellatorEvenet = await getBellator();
  res.status(200).send(bellatorEvenet);
});

app.get("/ufc", async (req, res) => {
  const ufcEvent = await getUFC();
  res.status(200).send(ufcEvent);
});

app.get("/ufcFighter/:name", async (req, res) => {
  const ufcFighterInfo = await getUFCFighter(req.params.name);
  res.status(200).send(ufcFighterInfo);
});
