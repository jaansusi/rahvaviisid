import React from 'react';
import PersonsList from './PersonsList';
import {
  Routes,
  Route
} from 'react-router-dom';
import PersonView from './PersonView';
import PersonEdit from './PersonEdit';

const PersonWrapper = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<PersonsList />} />
        <Route path="/uus" element={<PersonEdit newItem={true} />} />
        <Route path="/:id/vaata" element={<PersonView />} />
        <Route path="/:id/muuda" element={<PersonEdit />} />
      </Routes>
    </>
  );
}

export default PersonWrapper;