import React from 'react';
import { Typography, Box, Paper, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { EmojiEvents, Info, Star, TrendingUp, Bolt, Speed, Verified, Hub, LinkedIn } from '@mui/icons-material';
import EssayForm from '../components/EssayForm';

const featureBullets = [
  { icon: <Verified color="success" />, text: 'Accurate AI Scoring' },
  { icon: <Speed color="primary" />, text: 'Quick Feedback' },
  { icon: <Hub color="warning" />, text: 'RAG-Powered Recommendations' },
  { icon: <Bolt color="secondary" />, text: 'Instant Progress Tracking' },
];

const HomePage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Nerogen';
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) favicon.href = '/logo.png';
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
        <Typography variant="h2" color="primary" className="six-caps-heading" sx={{ fontFamily: 'Six Caps', fontWeight: 400, letterSpacing: 2 }}>
          Welcome to Neurograde!
        </Typography>
      </Box>
      <EssayForm />
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(135deg, #fffde7 60%, #e3f2fd 100%)', mt: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom sx={{ fontFamily: 'Raleway', fontWeight: 700 }}>
          Why Neurograde?
        </Typography>
        <List>
          {featureBullets.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={<Typography variant="h6" sx={{ fontFamily: 'Raleway', fontWeight: 700 }}>{item.text}</Typography>} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Info color="secondary" sx={{ mr: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            AI-powered essay evaluation, instant feedback, and progress tracking.
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          This app helps you improve your IELTS Writing Task 2 essays by providing detailed, AI-generated feedback and band scores. Unlike simple chatbots, it uses Retrieval-Augmented Generation (RAG) to compare your essay with a database of real, scored essays—giving you more accurate, context-aware evaluations and actionable recommendations.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Star color="warning" sx={{ mr: 1 }} />
          <Typography variant="body2">
            <b>Why is this better than ChatGPT?</b> RAG enables the system to reference real essays, not just generate generic feedback. This means your feedback is more personalized and relevant to IELTS standards.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp color="success" sx={{ mr: 1 }} />
          <Typography variant="body2">
            <b>Track your progress</b> with band scores, feedback, and visual stats on your dashboard.
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ mt: 6, textAlign: 'center', color: '#888' }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: 8 }}>Created by <b>Momin Mahmud Jalib</b></span>
          <a href="https://www.linkedin.com/in/mominmahmud/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <LinkedIn sx={{ fontSize: 20, mr: 0.5 }} />
            LinkedIn
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage; 