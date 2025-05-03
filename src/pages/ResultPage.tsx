import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  Chip,
  Divider,
  Alert,
  useTheme,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  TaskAlt as TaskAltIcon,
  Psychology as PsychologyIcon,
  Translate as TranslateIcon,
  AutoGraph as AutoGraphIcon,
  Star,
  Feedback,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { fetchEssay } from '../services/api';
import type { EssayWithEvaluation } from '../types/essay';

const scoreColors = ['#1976d2', '#43a047', '#fbc02d', '#e57373'];
const scoreLabels = [
  { label: 'Task Achievement', icon: <EmojiEvents /> },
  { label: 'Coherence & Cohesion', icon: <Star /> },
  { label: 'Lexical Resource', icon: <Star /> },
  { label: 'Grammatical Range', icon: <Star /> },
];

const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [essay, setEssay] = useState<EssayWithEvaluation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) throw new Error('No essay ID provided');
        const data = await fetchEssay(id);
        setEssay(data);
        console.log('ResultPage essay:', data);
      } catch (err) {
        setError('Failed to load essay results');
        console.error('ResultPage API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error || !essay || !essay.evaluation) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'No evaluation data available'}
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            variant="outlined"
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  const { evaluation } = essay;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              variant="outlined"
              sx={{ mb: 3 }}
            >
              Back to Home
            </Button>
            <Typography variant="h4" gutterBottom>
              Essay Evaluation Results
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Detailed analysis of your essay performance across all IELTS criteria
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[evaluation.task_achievement, evaluation.coherence_cohesion, evaluation.lexical_resource, evaluation.grammatical_range].map((score, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ bgcolor: scoreColors[idx], color: '#fff', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { boxShadow: 8, transform: 'translateY(-6px) scale(1.03)' } }}>
                  <CardContent>
                    {scoreLabels[idx].icon}
                    <Typography variant="h6" sx={{ mt: 1 }}>{scoreLabels[idx].label}</Typography>
                    <CircularProgress variant="determinate" value={score * 10} size={80} thickness={6} sx={{ color: '#fff', mt: 2 }} />
                    <Typography variant="h4" sx={{ mt: 2 }}>{score}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #fffde7 60%, #e3f2fd 100%)' }}>
            <Typography variant="h5" color="secondary" gutterBottom>Overall Score</Typography>
            <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>{evaluation.overall_score}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: 'bold' }}>Recommendations</Typography>
            <Box sx={{ whiteSpace: 'pre-line' }}>
              {evaluation.feedback.split(/\n+/).map((line, idx) => {
                // Bold headings like **Task Achievement (6.5):**
                const match = line.match(/^\*\*(.+?):?\*\*\s*(.*)$/);
                if (match) {
                  return (
                    <Typography key={idx} variant="subtitle1" sx={{ fontWeight: 900, color: '#1976d2', mb: 1 }}>
                      {match[1]}{match[2] ? ': ' : ''}
                      <span style={{ fontWeight: 400, color: '#333' }}>{match[2]}</span>
                    </Typography>
                  );
                }
                return (
                  <Typography key={idx} variant="body2" sx={{ mb: 1 }}>{line}</Typography>
                );
              })}
            </Box>
          </Paper>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Original Essay
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                {essay.content}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
      <Box sx={{ mt: 6, textAlign: 'center', color: '#888' }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2">
          Made by <b>Momin Mahmud Jalib</b> &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/mominmahmud" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            LinkedIn
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default ResultPage; 