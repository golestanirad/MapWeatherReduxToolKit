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
    border: "2px solid gray",
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
  const { forecast, timezone } = location;

  ///// Hooks
  const classes = useStyles();

  ////Helpers
  const createForecaseData = (forecast) => {
    const trimedForecastData = [];
    forecast.map((item) => {
      const dayOfWeek = converUnixTime(item.dt, timezone, "ddd");
      const timeOfDay = converUnixTime(item.dt, timezone, "HH:MM");
      const dayOfMonth = converUnixTime(item.dt, timezone, "MMM/DD");
      const timeSlice = {};
      timeSlice["temp"] = Math.round(item.temp);
      timeSlice["icon"] = item.icon;
      timeSlice["dayOfWeek"] = dayOfWeek;
      timeSlice["timeOfDay"] = timeOfDay;
      timeSlice["dayOfMonth"] = dayOfMonth;
      trimedForecastData.push(timeSlice);
    });


    let day = trimedForecastData[0].dayOfWeek;
    const finalForcastData = [];
    let daySlice = {};
    let whichForecast = 9;
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
          };
          whichForecast++;
          break;
        case 2:
          daySlice["secondForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
        case 3:
          daySlice["thirdForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
        case 4:
          daySlice["fourthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
        case 5:
          daySlice["fifthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
        case 6:
          daySlice["sixthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
        case 7:
          daySlice["seventhForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
        case 8:
          daySlice["eighthForecast"] = {
            temp: item.temp,
            icon: item.icon,
            timeOfDay: item.timeOfDay,
          };
          whichForecast++;
          break;
      }
      //   if (whichForecast === 1) {
      //     daySlice["firstForecast"] = {
      //       temp: item.temp,
      //       icon: item.icon,
      //       timeOfDay: item.timeOfDay,
      //     };
      //     whichForecast++;
      //   } else {
      //     if (whichForecast === 2) {
      //       daySlice["secondForecast"] = {
      //         temp: item.temp,
      //         icon: item.icon,
      //         timeOfDay: item.timeOfDay,
      //       };
      //       whichForecast++;
      //     } else {
      //       if (whichForecast === 3) {
      //         daySlice["thirdForecast"] = {
      //           temp: item.temp,
      //           icon: item.icon,
      //           timeOfDay: item.timeOfDay,
      //         };
      //         whichForecast++;
      //       } else {
      //         if (whichForecast === 4) {
      //           daySlice["fourthForecast"] = {
      //             temp: item.temp,
      //             icon: item.icon,
      //             timeOfDay: item.timeOfDay,
      //           };
      //           whichForecast++;
      //         } else {
      //           if (whichForecast === 5) {
      //             daySlice["fifthForecast"] = {
      //               temp: item.temp,
      //               icon: item.icon,
      //               timeOfDay: item.timeOfDay,
      //             };
      //             whichForecast++;
      //           } else {
      //             if (whichForecast === 6) {
      //               daySlice["sixthForecast"] = {
      //                 temp: item.temp,
      //                 icon: item.icon,
      //                 timeOfDay: item.timeOfDay,
      //               };
      //               whichForecast++;
      //             } else {
      //               if (whichForecast === 7) {
      //                 daySlice["seventhForecast"] = {
      //                   temp: item.temp,
      //                   icon: item.icon,
      //                   timeOfDay: item.timeOfDay,
      //                 };
      //                 whichForecast++;
      //               } else {
      //                 if (whichForecast === 8) {
      //                   daySlice["eighthForecast"] = {
      //                     temp: item.temp,
      //                     icon: item.icon,
      //                     timeOfDay: item.timeOfDay,
      //                   };
      //                   whichForecast++;
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
    });
   
    return finalForcastData;
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small" aria-label="a dense table">
        <TableBody style={{ width: "100px" }}>
          {createForecaseData(forecast).map((row) => (
            <TableRow className={classes.row} key={shortID.generate()}>
              <TableCell className={classes.cell} align="right">
                <div className={classes.day}>
                  <span>{row.dayOfMonth}</span>
                  <span>{row.day}</span>
                </div>
              </TableCell>
              {[
                "firstForecast",
                "secondForecast",
                "thirdForecast",
                "fourthForecast",
                "fifthForecast",
                "sixthForecast",
                "seventhForecast",
                "eighthForecast",
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
