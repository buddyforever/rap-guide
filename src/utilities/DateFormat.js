export const dateFormat = (dateAsString, type = 'short') => {
  const date = new Date(dateAsString);

  let hours = date.getHours();
  let ampm = "AM"
  if (hours > 12) {
    hours -= 12
    ampm = "PM"
  }
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  switch (type) {
    case 'short':
      return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " at " + hours + ":" + minutes + " " + ampm;
    default:
      return date;
  }
}