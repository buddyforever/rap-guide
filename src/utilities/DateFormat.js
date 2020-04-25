export const dateFormat = (dateAsString, type = 'short') => {
  const date = new Date(dateAsString);

  let hours = date.getHours();
  let ampm = "AM"
  if (hours > 12) {
    hours -= 12
    ampm = "PM"
  }

  switch (type) {
    case 'short':
      return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + hours + ":" + date.getMinutes() + " " + ampm;
    default:
      return date;
  }
}