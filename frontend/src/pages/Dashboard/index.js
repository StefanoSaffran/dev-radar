import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { GiRadarSweep } from 'react-icons/gi';

import api from '~/services/api';
import Loading from '~/components/Loading';
import DevItem from '~/components/DevItem/index';
import DevForm from '~/components/DevForm';
import Pagination from '~/components/Pagination';

import { DevList, Aside, Main, Container } from './styles';

export default function Dashboard() {
  const [devs, setDevs] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadDevs = async () => {
    try {
      const { data } = await api.get('/devs', {
        params: { page },
      });

      const { docs, ...rest } = data;

      setDevs(docs);
      setPageInfo(rest);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/devs/${id}`);

      if (devs.length === 1) {
        setPage(1);
      }

      if (page === 1 && devs.length === 10 && pageInfo.pages > 1) {
        loadDevs();
      }

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

      if (devs.length === 10) {
        return loadDevs();
      }

      setDevs([data, ...devs]);

      toast.success('Dev cadastrado com sucesso');
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    loadDevs();
  }, [page]); //eslint-disable-line

  return (
    <>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Container>
            <h1>
              <GiRadarSweep size={60} color="#fff" />
              DevRadar
            </h1>
            <Aside>
              <strong>Cadastrar</strong>
              <DevForm onSubmit={handleAddDev} />
            </Aside>
            <Pagination
              visible={pageInfo.pages !== 1}
              page={page}
              totalPages={pageInfo.pages}
              setPage={setPage}
            />
          </Container>
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
