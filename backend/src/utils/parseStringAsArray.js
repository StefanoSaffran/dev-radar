const parseStringAsArray = arrayAsString => {
  return arrayAsString.split(',').map(tech => tech.trim());
}

module.exports = parseStringAsArray;