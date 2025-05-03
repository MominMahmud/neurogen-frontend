import React from 'react';
import { Box, Typography } from '@mui/material';
import EssayForm from '../components/EssayForm';
import EssayList from '../components/EssayList';

const EssayPage: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Submit a New Essay</Typography>
    <EssayForm />
    <EssayList />
  </Box>
);

export default EssayPage; 