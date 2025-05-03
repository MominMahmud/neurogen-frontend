import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, LinearProgress, Snackbar, Alert } from '@mui/material';
import { submitEssay } from '../services/api';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Creating embeddings...',
  'Evaluating essay...',
  'Generating recommendations...'
];

const DUMMY_TOTAL = 100;
const DUMMY_STEP_TIME = 40; // ms per increment

const EssayForm: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    setFieldsDisabled(true);
    setProgress(0);
    setStep(0);
    setOpenToast(false);

    // Simulate loader with steps
    let current = 0;
    let currentStep = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current % (DUMMY_TOTAL / steps.length) === 0 && currentStep < steps.length - 1) {
        setStep(++currentStep);
      }
      if (current >= DUMMY_TOTAL) {
        clearInterval(interval);
      }
    }, DUMMY_STEP_TIME);

    try {
      // Wait for loader to finish
      await new Promise(res => setTimeout(res, DUMMY_TOTAL * DUMMY_STEP_TIME + 300));
      // Submit essay
      const result = await submitEssay({ prompt, content });
      setSuccess(true);
      setPrompt('');
      setContent('');
      setOpenToast(true);
      if (result && result.id) {
        navigate(`/result/${result.id}`);
      }
    } catch (err) {
      setError('Failed to submit essay.');
      setOpenToast(true);
    } finally {
      setLoading(false);
      setFieldsDisabled(false);
      setProgress(0);
      setStep(0);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #e3f2fd 60%, #fffde7 100%)' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Essay Prompt"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
          disabled={fieldsDisabled || loading}
        />
        <TextField
          label="Essay Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          fullWidth
          required
          multiline
          minRows={6}
          sx={{ mb: 2 }}
          disabled={fieldsDisabled || loading}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading || fieldsDisabled} sx={{ mb: 2 }}>
          {loading ? 'Submitting...' : 'Submit Essay'}
        </Button>
      </form>
      {loading && (
        <Box sx={{ mt: 4 }}>
          <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ height: 10, borderRadius: 5 }} />
          <Typography variant="body2" sx={{ mt: 1, color: '#1976d2', fontWeight: 'bold' }}>
            {steps[step]} ({progress}%)
          </Typography>
        </Box>
      )}
      <Snackbar open={openToast} autoHideDuration={4000} onClose={() => setOpenToast(false)}>
        {success ? (
          <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
            Essay submitted successfully!
          </Alert>
        ) : error ? (
          <Alert onClose={() => setOpenToast(false)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        ) : <span />}
      </Snackbar>
    </Paper>
  );
};

export default EssayForm; 