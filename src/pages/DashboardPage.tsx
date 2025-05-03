import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { EmojiEvents, Assessment, Timeline } from '@mui/icons-material';
import { fetchStats, fetchEssays } from '../services/api';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [essays, setEssays] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats()
      .then(data => {
        setStats(data);
        console.log('Stats:', data);
      })
      .catch(err => {
        setError('Failed to fetch stats');
        console.error('Stats API error:', err);
      });
    fetchEssays(0, 100)
      .then(data => {
        setEssays(data);
        console.log('Essays:', data);
      })
      .catch(err => {
        setError('Failed to fetch essays');
        console.error('Essays API error:', err);
      });
  }, []);

  // Calculate evaluations this month
  const thisMonth = new Date().getMonth();
  const evalsThisMonth = essays.filter(e => new Date(e.created_at).getMonth() === thisMonth).length;

  // Prepare data for graphs
  const lineData = essays.map(e => ({
    date: new Date(e.created_at).toLocaleDateString(),
    score: e.evaluation?.overall_score || 0
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const barData = stats ? Object.entries(stats.score_distribution).map(([score, count]) => ({ score, count })) : [];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">Dashboard</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e3f2fd', color: '#1976d2', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { boxShadow: 8, transform: 'translateY(-6px) scale(1.03)' } }}>
            <CardContent>
              <EmojiEvents sx={{ fontSize: 40 }} />
              <Typography variant="h6">Average Score</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{stats ? Math.round(stats.average_score) : '--'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#fffde7', color: '#fbc02d', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { boxShadow: 8, transform: 'translateY(-6px) scale(1.03)' } }}>
            <CardContent>
              <Assessment sx={{ fontSize: 40 }} />
              <Typography variant="h6">Total Evaluations</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{stats ? Math.round(stats.total_evaluations) : '--'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e8f5e9', color: '#43a047', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { boxShadow: 8, transform: 'translateY(-6px) scale(1.03)' } }}>
            <CardContent>
              <Timeline sx={{ fontSize: 40 }} />
              <Typography variant="h6">Evaluations This Month</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{evalsThisMonth}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #fffde7 60%, #e3f2fd 100%)' }}>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Score Distribution</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="score" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #e3f2fd 60%, #fffde7 100%)' }}>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Score Over Time</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#43a047" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DashboardPage; 