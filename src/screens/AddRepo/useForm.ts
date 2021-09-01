import React from 'react';

function useForm() {
  const [owner, setOwner] = React.useState('');
  const [repo, setRepo] = React.useState('');

  return {
    owner,
    repo,
    setOwner,
    setRepo
  };
}

export { useForm };
