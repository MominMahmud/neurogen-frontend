import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  Button,
  Alert
} from '@mui/material';
import { Assignment, Star, Feedback, Visibility } from '@mui/icons-material';
import { EssayWithEvaluation } from '../types/essay';
import { fetchEssays } from '../services/api';
import { useNavigate } from 'react-router-dom';

const EssayList: React.FC = () => {
  const [essays, setEssays] = useState<EssayWithEvaluation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEssays = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEssays(0, 100);
        setEssays(data);
        console.log('EssayList essays:', data);
      } catch (err) {
        setError('Failed to fetch evaluations');
        console.error('EssayList API error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEssays();
  }, []);

  console.log('EssayList essays:', essays);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Evaluations
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <List sx={{ bgcolor: '#f9f9fb', borderRadius: 2 }}>
        {essays.map((essay, idx) => (
          <React.Fragment key={essay.id}>
            <Paper elevation={3} sx={{ mb: 2, p: 2, background: idx % 2 === 0 ? '#e3f2fd' : '#fffde7', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { boxShadow: 8, transform: 'translateY(-6px) scale(1.03)' } }}>
              <ListItem alignItems="flex-start" secondaryAction={
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/result/${essay.id}`)}
                  sx={{ fontWeight: 'bold' }}
                >
                  View Result
                </Button>
              }>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  <Assignment />
                </Avatar>
                <ListItemText
                  primary={<Typography variant="h6" sx={{ maxWidth: 320, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{essay.prompt}</Typography>}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {essay.content}
                      </Typography>
                      {essay.evaluation && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Chip icon={<Star sx={{ color: '#ffd600' }} />} label={`Score: ${essay.evaluation.overall_score}`} color="primary" sx={{ fontWeight: 'bold', bgcolor: '#fffde7', color: '#1976d2' }} />
                          <Chip icon={<Feedback sx={{ color: '#43a047' }} />} label={essay.evaluation.feedback.substring(0, 40) + '...'} color="success" />
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            </Paper>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
        {!loading && essays.length === 0 && !error && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            Your evaluations will appear here once you submit essays.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default EssayList; 