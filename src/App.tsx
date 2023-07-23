import React from 'react';
import ReservationManagement from './components/ReservationManagement';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App: React.FC = () => {
  return (
    <div>
      <ReservationManagement />
    </div>
  );
};

export default App;