import React, { FC, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Track } from '../../models';

interface SearchProps {
  allTracks: Track[];
  setFilteredTracks: (tracks: Track[]) => void;
}

const Search: FC<SearchProps> = ({ allTracks, setFilteredTracks }) => {
  const [searchKey, setSearchKey] = useState<string>('');

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const filteredTracks = allTracks.filter(track =>
        track.name.toLowerCase().includes(searchKey.toLowerCase()) //TODO: search track by artist name 
      );
      setFilteredTracks(filteredTracks);
    }, 300);

    if (searchKey === '') {
      setFilteredTracks(allTracks);
    } else {
      debouncedFilter();
    }

    return () => debouncedFilter.cancel();
  }, [searchKey, allTracks]);

  return (
    <div className="search-component">
      <input
      className='search-component-input'
        type="text"
        value={searchKey}
        placeholder="Search Numbers & Tracks"
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </div>
  );
};

export default Search;
