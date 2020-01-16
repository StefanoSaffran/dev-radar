const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async store (req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
      
      } catch(err) {
        return res.send(err.message);
      }
    
      
    }
  
    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find({});
  
    return res.json(devs);
  },

  async show(req, res) {
    const { id } = req.params;

    const dev = await Dev.findById(id);

    if (!dev) {
      return res.status(400).json({ error: 'Dev not found.' });
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { techs, latitude, longitude } = req.body;
    const { id } = req.params;

    const dev = await Dev.findById(id);

    if (!dev) {
      return res.status(400).json({ error: 'Dev not found.' });
    }

    const techsArray = parseStringAsArray(techs);
    
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
  
    const updatedUser = await Dev.findByIdAndUpdate(id, {
      techs: techsArray,
      location,
    }, { new: true });

    return res.json(updatedUser);
  },

  async delete(req, res) {
    const { id } = req.params;

    const dev = await Dev.findById(id);

    if (!dev) {
      return res.status(400).json({ error: 'Dev not found.' });
    }

    try {
      await Dev.findByIdAndRemove(id);
      return res.status(204).end();
    } catch(err) {
      return res.send(err);
    }
  }
}