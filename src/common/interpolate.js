import mustache from 'mustache'

mustache.escape = function (text) {
  return text
}

export function interpolate (string, data) {
  return mustache.render(string, data)
}
