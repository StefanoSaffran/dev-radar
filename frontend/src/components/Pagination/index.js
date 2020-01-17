import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import { Container } from './styles';

export default function Pagination({ page, totalPages, setPage, visible }) {
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <Container style={showWhenVisible}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <FaAngleLeft size={20} />
        Anterior
      </button>
      <p>
        {page} de {totalPages}
      </p>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Próxima
        <FaAngleRight size={20} />
      </button>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
