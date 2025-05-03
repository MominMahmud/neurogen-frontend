import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #143a5a 60%, #fbc02d 100%)' }}>
      <Toolbar>
        <Box component={RouterLink} to="/" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Neurograde" title="Neurograde" style={{ height: 54 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit" component={RouterLink} to="/" startIcon={<HomeRoundedIcon sx={{ fontSize: 32 }} />} sx={{ fontWeight: 'bold', fontSize: 18 }}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/dashboard" startIcon={<InsightsRoundedIcon sx={{ fontSize: 32 }} />} sx={{ fontWeight: 'bold', fontSize: 18 }}>
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/evaluations" startIcon={<AssignmentTurnedInRoundedIcon sx={{ fontSize: 32 }} />} sx={{ fontWeight: 'bold', fontSize: 18 }}>
            Evaluations
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 