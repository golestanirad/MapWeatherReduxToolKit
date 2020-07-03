import moment from "moment-timezone";

export const converUnixTime = (
  unixTime,
  timezone,
  timeFromat
) => {
  //return moment.unix(unixTime).tz(timeZoneToBeConvertedTo).format(timeFromat);
  return moment
    .unix(unixTime)
    .utcOffset(timezone / 60)
    .format(timeFromat);
};
