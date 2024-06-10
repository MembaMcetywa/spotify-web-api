
import React, { FC, useState } from 'react';
import Search from '../search';
import { Artist, HomeProps } from '../../models';


const Home: FC<HomeProps> = ({ token, setToken }) => {
  const [artists, setArtists] = useState<Artist[]>([]);

  return (
    <Search token={token} setArtists={setArtists} />
  );
}


export default Home;