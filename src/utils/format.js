//js格式化分钟转为天、时、分
export function formatMinutes(minutes) {

  var day = parseInt(Math.floor(minutes / 1440));

  var hour = day > 0

    ? Math.floor((minutes - day * 1440) / 60)

    : Math.floor(minutes / 60);

  var minute = hour > 0

    ? Math.floor(minutes - day * 1440 - hour * 60)

    : minutes;

  var time = "";

  if (day > 0) time += day + "天";

  if (hour > 0) time += hour + "小时";

  if (minute > 0) time += minute + "分钟";

  return time;

}