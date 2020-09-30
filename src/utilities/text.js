export function splitFirstWord(string) {
  return [string.split(" ")[0], string.indexOf(' ') > 0 ? string.substr(string.indexOf(' ')) : '']
}