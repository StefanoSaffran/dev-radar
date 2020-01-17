import React, { useState, useEffect } from 'react';

import { MdDone } from 'react-icons/md';

import { Form } from './styles';

export default function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lon } = position.coords;

        setLatitude(lat);
        setLongitude(lon);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  const handleAddDev = async e => {
    e.preventDefault();
    await onSubmit({ github_username, techs, latitude, longitude });

    setGithubUsername('');
    setTechs('');
  };

  return (
    <Form onSubmit={handleAddDev}>
      <label htmlFor="github_username">
        Usuário do Github
        <input
          id="github_username"
          name="github_username"
          required
          value={github_username}
          onChange={({ target }) => setGithubUsername(target.value)}
        />
      </label>

      <label htmlFor="techs">
        Tecnologias
        <input
          id="techs"
          name="techs"
          required
          value={techs}
          onChange={({ target }) => setTechs(target.value)}
        />
      </label>
      <div>
        <label htmlFor="latitude">
          Latitude
          <input
            id="latitude"
            name="latitude"
            required
            value={latitude}
            type="number"
            onChange={({ target }) => setLatitude(target.value)}
          />
        </label>

        <label htmlFor="longitude">
          Longitude
          <input
            id="longitude"
            name="longitude"
            required
            value={longitude}
            type="number"
            onChange={({ target }) => setLongitude(target.value)}
          />
        </label>
      </div>
      <button type="submit">
        <MdDone size={23} color="#fff" /> Salvar
      </button>
    </Form>
  );
}
