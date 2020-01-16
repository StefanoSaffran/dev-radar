import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Loading from '~/components/Loading';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Buttons } from './styles';

export default function UpdateDev() {
  const [name, setName] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getDev = async () => {
      try {
        const { data } = await api.get(`/devs/${id}`);

        setName(data.name);
        setTechs(data.techs);
        setLatitude(data.location.coordinates[1]);
        setLongitude(data.location.coordinates[0]);
      } catch (err) {
        toast.error(
          (err.response && err.response.data.error) ||
            'Erro de comunicação com o servidor'
        );
      } finally {
        setLoading(false);
      }
    };
    getDev();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await api.put(`/devs/${id}`, {
        techs,
        latitude,
        longitude,
      });

      toast.success('Dev atualizado com sucesso');
      history.push('/');
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <h1>Editando {name}</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="coordinates">
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
            <Buttons>
              <button type="button" onClick={() => history.push('/')}>
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit">
                <MdDone size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </Buttons>
          </form>
        </>
      )}
    </Container>
  );
}
