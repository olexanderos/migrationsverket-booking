#!/usr/bin/env node

import dotenv from "dotenv";
import puppeteer from "puppeteer";
import chalk from "chalk";
import prompts from "prompts";

//ask about email and password
const response = async function () {
  const questions = [
    {
      type: "text",
      name: "firstName",
      message: "Enter your first name",
      initial: "John",
    },
    {
      type: "text",
      name: "lastName",
      message: "Enter your last name",
      initial: "Doe",
    },
    {
      type: "text",
      name: "phone",
      message: "Enter your telephone number",
      initial: "0761234567",
    },
    {
      type: "text",
      name: "email",
      message: "Enter your email",
      initial: "your.name@gmail.com",
    },
  ];

  const answers = await prompts(questions);
  //setTimeout(() => { return answers; }, 20000);
  //console.log(answers);
  //   return "test";
  return Object.assign({}, answers);
};

async function main(response) {
  const { EXTRACT_URL, FIRSTNAME: firstname, LASTNAME: lastname, PHONE: phone, EMAIL: email, DEBUG } = process.env;
  const { WIDTH: width, HEIGHT: height } = process.env;
  const headless = typeof DEBUG === "undefined" || DEBUG == false;
  const outputs = ["01-page.png", "02-page.png", "03-page.png"];
  const screenshots = [...outputs];
  //   console.log("EXTRACT_URL:", EXTRACT_URL);
  //   console.log("firstname:", firstname);
  //   console.log("response:", response);
  console.log("headless:", headless);

  // open browser
  const browser = await puppeteer.launch({ headless, args: [`--window-size=${width},${height}`] });

  // open page
  const page = await browser.newPage();
  await page.setViewport({ width: parseInt(width), height: parseInt(height) });
  await page.goto(EXTRACT_URL);

  // Click on "Have your fingerprints and photograph taken"
  await page.click("#fingeravtryck_foto + label");

  // Answer "Stockholm (Sundbyberg)" when asking "Where do you want to make an appointment?"
  await page.select("#enhet", "0");

  // Select 3 visitors
  await page.select("#sokande", "2");

  // Click on "Accept terms"
  await page.click("#godkannId1 + label");

  // Click on "Continue button"
  await page.waitForTimeout(300);
  await page.waitForSelector("input#bokaSubmit:not([disabled])");
  await page.waitForTimeout(300);
  await page.click("#bokaSubmit");
  await page.screenshot({ path: screenshots.shift() });

  // Enter contac details
  await page.waitForSelector("#fnamn");
  await page.type("#fnamn", firstname);
  await page.type("#enamn", lastname);
  await page.type("#telefon", phone);
  await page.type("#epost", email);
  await page.type("#epost2", email);
  await page.screenshot({ path: screenshots.shift() });

  const error = await page.evaluate(() => {
    return document.querySelector(".error");
  });

  if (error) {
    // cleanup & steps screenshots
    browser.close();
    await page.screenshot({ path: screenshots.shift() });
    await page.waitForTimeout(20000);
  }

  console.log(chalk.blue("\nSee screenshots: "), outputs);
}

// load .env variables, console.log(process.env);
const envConfigurationResult = dotenv.config();
if (envConfigurationResult.error) throw envConfigurationResult.error;

// ask about email and password
//const response = getParameters();

main(response);
