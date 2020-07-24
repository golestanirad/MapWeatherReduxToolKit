import React, { useEffect } from "react";
import shortID from "shortid";
/// project files
import styles from "./forecast-weather.module.scss";
import ForecastCard from "./forecastCard/forecast-card.component";
import { converUnixTime } from "../../../utils/time";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {},
  row: {
    borderTop: "1px solid lightGray",
  },
  cell: {
    maxWidth: "35px",
    padding: "6px",
  },
  insideCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "10px",
    margin: "2px",
  },
  day: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "10px",
    width: "37px",
    padding: "0 2px",
  },
  icon: {
    backgroundColor: "gray",
  },
});

const ForecastWeather = ({ location }) => {
  //// Props
  const { forecast, timezone, current } = location;

  ///// Hooks
  const classes = useStyles();

  ////Helpers
  const dateOfToday = converUnixTime(current.dt, timezone, "MMM/DD");
  const createForecaseData = (forecast) => {
    const trimedForecastData = [];
    forecast.map((item) => {
      const timeOfDay = converUnixTime(item.dt, timezone, "hh A");
      const morningTimesToBeIgnored = /(12 AM|01 AM|02 AM|03 AM|04 AM|05 AM)/i;
      if (morningTimesToBeIgnored.test(timeOfDay)) return;

      const dayOfWeek = converUnixTime(item.dt, timezone, "ddd");
      const dayOfMonth = converUnixTime(item.dt, timezone, "MMM/DD");
      const timeSlice = {};
      timeSlice["temp"] = Math.round(item.temp);
      timeSlice["icon"] = item.icon;
      timeSlice["dayOfWeek"] = dayOfWeek;
      timeSlice["timeOfDay"] = timeOfDay;
      timeSlice["dayOfMonth"] = dayOfMonth;
      timeSlice["description"] = item.description;
      trimedForecastData.push(timeSlice);
    });

    let day = trimedForecastData[0].dayOfWeek;
    const finalForcastData = [];
    let daySlice = {};
    let whichForecast = 7;
    trimedForecastData.map((item) => {
      if (item.dayOfWeek === day) whichForecast--;
    });

    trimedForecastData.map((item) => {
      if (item.dayOfWeek !== day) {
        finalForcastData.push(daySlice);
        daySlice = {};
        day = item.dayOfWeek;
        whichForecast = 1;
      }
      daySlice["day"] = item.dayOfWeek;
      daySlice["dayOfMonth"] = item.dayOfMonth;
      switch (whichForecast) {
        case 1:
          daySlice["firstForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
            description: item.description,
          };
          whichForecast++;
          break;
        case 2:
          daySlice["secondForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
            description: item.description,
          };
          whichForecast++;
          break;
        case 3:
          daySlice["thirdForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
            description: item.description,
          };
          whichForecast++;
          break;
        case 4:
          daySlice["fourthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
            description: item.description,
          };
          whichForecast++;
          break;
        case 5:
          daySlice["fifthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
            description: item.description,
          };
          whichForecast++;
          break;
        case 6:
          daySlice["sixthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
            description: item.description,
          };
          whichForecast++;
          break;
        // case 7:
        //   daySlice["seventhForecast"] = {
        //     temp: item.temp,
        //     icon: item.icon,
        //     timeOfDay: item.timeOfDay,
        //     description: item.description,
        //   };
        //   whichForecast++;
        //   break;
        // case 8:
        //   daySlice["eighthForecast"] = {
        //     temp: item.temp,
        //     icon: item.icon,
        //     timeOfDay: item.timeOfDay,
        //     description: item.description,
        //   };
        //   whichForecast++;
        //   break;
      }
    });
    return finalForcastData;
  };
  //////////  Return
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small" aria-label="forecast weather table">
        {/* <TableBody style={{ width: "100px" }}> */}
        <TableBody>
          {createForecaseData(forecast).map((row) => (
            <TableRow className={classes.row} key={shortID.generate()}>
              <TableCell className={classes.cell} align="right">
                <div className={classes.day}>
                  {dateOfToday === row.dayOfMonth ? (
                    "Today"
                  ) : (
                    <>
                      <span>{row.dayOfMonth}</span>
                      <span>{row.day}</span>
                    </>
                  )}
                </div>
              </TableCell>
              {[
                "firstForecast",
                "secondForecast",
                "thirdForecast",
                "fourthForecast",
                "fifthForecast",
                "sixthForecast",
                // "seventhForecast",
                // "eighthForecast",
              ].map((forcasetSlice) => (
                <TableCell
                  key={shortID.generate()}
                  className={classes.cell}
                  align="right"
                >
                  {row[forcasetSlice] && (
                    <ForecastCard
                      timeOfDay={row[forcasetSlice].timeOfDay}
                      temp={row[forcasetSlice].temp}
                      icon={row[forcasetSlice].icon}
                      description={row[forcasetSlice].description}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ForecastWeather;
