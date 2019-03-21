import mustache from 'mustache'

mustache.escape = function (text) {
  return text
}

export default function interpolate (string, data) {
  return mustache.render(string, data)
}
