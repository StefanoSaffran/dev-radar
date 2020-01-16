import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

import { Dev, DevInfo, ListButtons } from './styles';

export default function DevItem({ dev, handleDelete }) {
  return (
    <>
      <Dev>
        <header>
          <img src={dev.avatar_url} alt={dev.name} />
          <DevInfo>
            <div>
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
            <button type="button" onClick={() => handleDelete(dev.id)}>
              <MdClear size={20} color="red" />
            </button>
          </DevInfo>
        </header>
        <p>{dev.bio}</p>
        <ListButtons>
          <a href={`https://github.com/${dev.github_username}`}>
            Acessar perfil no github
          </a>
          <Link to={`/dev/${dev.id}`}>editar</Link>
        </ListButtons>
      </Dev>
    </>
  );
}

DevItem.propTypes = {
  dev: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
