export const today = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}

export const formatTime = (t: number) => {
  var minutes: number = t % 60;
  var hours: number = (t - minutes) / 60;
  return { hour: hours, minute: minutes };
}

export const timeInMinutesTotal = (hours: number | null, minutes: number | null) : number => {
  const calcHours: number = hours === null ? 0 : hours * 60;
  const calcMinutes: number = minutes === null ? 0 : minutes
  const total: number = calcHours + calcMinutes;
  return total;
}

export const formatDate = (d: string) => {
  var [year, month, day] = d.split('-');
  var result = {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  };
  return result;
}

export const dateToString = (d: any) => {
  var month = (d.month).toString();
  var day = d.day.toString();
  var year = d.year.toString();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  var result = [year, month, day].join('-');

  return result;
}
