const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const techsRegex = techsArray.map(tech => new RegExp(tech, 'i'));

    const devs = await Dev.find({
      techs: {
        $in: techsRegex,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 30000,
        }
      }
    });

    console.log(devs);

    return res.json(devs);
  }
}