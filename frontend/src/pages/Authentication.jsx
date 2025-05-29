import React, { useState, useContext } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  Snackbar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../contexts/AuthContext'; // Make sure this is correct

export default function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        const result = await handleLogin(username, password);
        setMessage("Login successful!");
        setOpen(true);
        setError('');
      }

      if (formState === 1) {
        const result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage("Registration successful!");
        setOpen(true);
        setError('');
        setFormState(0);
        setPassword("")
      }

    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        sx={{
          backgroundImage: 'url(/luffy.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
          width: '50%',
          height: '100vh'
        }}
      />
      <Grid
        sx={{
          width: { xs: '100%', md: '50%' },
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          p: 4
        }}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            mt: 0,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <div>
            <Button variant={formState === 0 ? 'contained' : ''} onClick={() => setFormState(0)}>
              Sign In
            </Button>
            <Button variant={formState === 1 ? 'contained' : ''} onClick={() => setFormState(1)}>
              Sign Up
            </Button>
          </div>

          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="full-name"
                label="Full Name"
                name="full-name"
                
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}

               autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p style={{ color: "red" }}>{error}</p>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleAuth}
            >
              {formState === 0 ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={handleClose}
      />
    </Grid>
  );
}
