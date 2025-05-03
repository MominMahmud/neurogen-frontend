import React from 'react';
import { Box, Typography } from '@mui/material';
import EssayList from '../components/EssayList';

const EvaluationsPage: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Evaluations</Typography>
    <EssayList />
  </Box>
);

export default EvaluationsPage;