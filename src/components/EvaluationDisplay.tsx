import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { EssayEvaluation } from '../types/essay';

interface EvaluationDisplayProps {
  evaluation: EssayEvaluation;
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({ evaluation }) => (
  <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
    <Typography variant="h6">Band Score: {evaluation.overall_score}</Typography>
    <Typography variant="body1" sx={{ mt: 1 }}>{evaluation.feedback}</Typography>
  </Paper>
);

export default EvaluationDisplay; 