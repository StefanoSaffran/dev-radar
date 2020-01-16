import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import api from '~/services/api';
import Loading from '~/components/Loading';
import DevItem from '~/components/DevItem';
import DevForm from '~/components/DevForm';

import { DevList, Aside, Main } from './styles';

export default function Dashboard() {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevs = async () => {
      try {
        const { data } = await api.get('/devs');

        setDevs(data);
      } catch (err) {
        toast.error(
          (err.response && err.response.data.error) ||
            'Erro de comunicação com o servidor'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDevs();
  }, []);

  const handleDelete = async id => {
    try {
      await api.delete(`/devs/${id}`);

      setDevs(devs.filter(dev => dev.id !== id));

      toast.success('Dev excluido com sucesso');
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    }
  };

  const handleAddDev = async devInfos => {
    try {
      const { data } = await api.post('/devs', devInfos);

      setDevs([...devs, data]);

      toast.success('Dev cadastrado com sucesso');
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev} />
          </Aside>
          <Main>
            <DevList>
              {devs.map(dev => (
                <DevItem key={dev.id} dev={dev} handleDelete={handleDelete} />
              ))}
            </DevList>
          </Main>
        </>
      )}
    </>
  );
}
