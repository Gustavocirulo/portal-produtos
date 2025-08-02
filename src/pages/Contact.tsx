import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Alert,
  Stack
} from '@mui/material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Simular envio do formulário
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Ocultar mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Contato
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 2 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Envie-nos uma mensagem
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
                
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />
                
                <TextField
                  fullWidth
                  label="Assunto"
                  value={formData.subject}
                  onChange={handleChange('subject')}
                  required
                />
                
                <TextField
                  fullWidth
                  label="Mensagem"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange('message')}
                  required
                />
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Enviar Mensagem
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Informações de Contato
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    E-mail
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    contato@portalufscar.com.br
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Telefone
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    (16) 3351-8000
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Endereço
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Universidade Federal de São Carlos<br/>
                    Rod. Washington Luís, km 235<br/>
                    São Carlos - SP, 13565-905
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Horário de Atendimento
              </Typography>
              
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Segunda a Sexta:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    8h às 18h
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Sábado:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    8h às 12h
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Domingo:</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Fechado
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact;
