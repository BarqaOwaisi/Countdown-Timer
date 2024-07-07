#! usr/bin/env/ node

import inquirer from "inquirer";

import { differenceInSeconds } from "date-fns";
import { getMinutes } from "date-fns/getMinutes";

const info = await inquirer.prompt({
  name: "Name",
  message: "Please Select Your Timer Type",
  type: "list",
  choices: [
    "Seconds Countdown Timer",
    "Minutes Countdown Timer",
    "Hours Countdown Timer",
  ],
});

if (info.Name === "Seconds Countdown Timer") {
  const secInfo = await inquirer.prompt([
    {
      name: "Seconds",
      message: "Please enter the amount of seconds.",
      type: "number",
      validate(input: any) {
        if (isNaN(input)) {
          return "Please enter a valid number.";
        } else if (input > 60) {
          return "Your number should be in seconds.";
        } else {
          return true;
        }
      },
    },
  ]);

  let input = secInfo.Seconds;

  function start(value: number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDiff = differenceInSeconds(new Date(initialTime), currentTime);

      if (timeDiff <= 0) {
        console.log("Timer has expired");
        clearInterval(interval); // Clear the interval when timer expires
        process.exit();
      }

      const hou = Math.floor(timeDiff / 3600);
      const minutes = Math.floor(timeDiff / 60);
      const seconds = timeDiff % 60;
      console.log(
        `${minutes.toString().padStart(2, "0")} : ${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);
  }

  start(input);
}

if (info.Name === "Minutes Countdown Timer") {
  const minInfo = await inquirer.prompt([
    {
      name: "Minutes",
      message: "Please enter the amount of minutes.",
      type: "number",
      validate: (val) => {
        if (isNaN(val)) {
          return "Please Enter A Valid Number.";
        } else {
          return true;
        }
      },
    },
  ]);

  function minStart(val: number) {
    const iniTime = new Date().setMinutes(new Date().getMinutes() + val);
    const interval1 = setInterval(() => {
      const currentTime = new Date();
      const diff = differenceInSeconds(new Date(iniTime), currentTime);

      if (diff <= 0) {
        console.log("Timer has expired.");
        clearInterval(interval1);
        process.exit();
      }

      const mins = Math.floor(diff / 60);
      const seconds = Math.floor(diff % 60);

      console.log( `${mins.toString().padStart(2, "0")}  ${seconds.toString().padStart(2, "0")}`);
    }, 1000);
  }

  minStart(minInfo.Minutes);
}

if (info.Name === "Hours Countdown Timer") {
  const hourInfo = await inquirer.prompt({
    name: "Hours",
    message: "Please enter the amount of hours.",
    type: "number",
    validate: (val) => {
      if (isNaN(val)) {
        return "Please enter a valid number.";
      } else {
        return true;
      }
    },
  });

  function hourStart(value: number) {
    const inTime = new Date().setHours(new Date().getHours() + value);
    const int = setInterval(() => {
      const currentTime = new Date();
      const diff = differenceInSeconds(new Date(inTime), currentTime);

      if (diff <= 0) {
        console.log("Timer has expired.");
        clearInterval(int);
        process.exit();
      }

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;
      console.log(
        `${hours.toString().padStart(2, "0")} : ${minutes
          .toString()
          .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
  }

  hourStart(hourInfo.Hours);
}
