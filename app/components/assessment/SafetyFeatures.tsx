import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  Alert,
  AlertTitle,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  Fab,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Security,
  Phone,
  Psychology,
  ExpandMore,
  ExpandLess,
  Help,
  Warning,
  Shield,
  Visibility,
  VisibilityOff,
  Delete,
  Download,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface SafetyFeaturesProps {
  variant?: 'full' | 'compact' | 'floating';
  showDataControls?: boolean;
  onDataExport?: () => void;
  onDataDelete?: () => void;
}

interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available: string;
  website?: string;
}

const crisisResources: CrisisResource[] = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: 'Free and confidential emotional support 24/7',
    available: '24/7',
    website: 'https://suicidepreventionlifeline.org',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free, 24/7 crisis support via text message',
    available: '24/7',
    website: 'https://crisistextline.org',
  },
  {
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Treatment referral and information service',
    available: '24/7',
    website: 'https://samhsa.gov',
  },
  {
    name: 'National Domestic Violence Hotline',
    phone: '1-800-799-7233',
    description: 'Support for domestic violence situations',
    available: '24/7',
    website: 'https://thehotline.org',
  },
];

export function SafetyFeatures({
  variant = 'full',
  showDataControls = true,
  onDataExport,
  onDataDelete,
}: SafetyFeaturesProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [crisisDialogOpen, setCrisisDialogOpen] = useState(false);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (variant === 'floating') {
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Fab
              color="error"
              onClick={() => setCrisisDialogOpen(true)}
              size={isMobile ? 'medium' : 'large'}
              sx={{
                backgroundColor: '#d32f2f',
                '&:hover': {
                  backgroundColor: '#b71c1c',
                },
              }}
            >
              <Phone />
            </Fab>
          </motion.div>
        </Box>

        <CrisisResourcesDialog
          open={crisisDialogOpen}
          onClose={() => setCrisisDialogOpen(false)}
        />
      </>
    );
  }

  if (variant === 'compact') {
    return (
      <Card sx={{ mb: 2, border: '1px solid', borderColor: 'warning.main' }}>
        <CardContent sx={{ py: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Warning color="warning" />
              <Typography variant="body2" fontWeight={500}>
                Need immediate support?
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setCrisisDialogOpen(true)}
              startIcon={<Phone />}
            >
              Crisis Resources
            </Button>
          </Box>
        </CardContent>
        
        <CrisisResourcesDialog
          open={crisisDialogOpen}
          onClose={() => setCrisisDialogOpen(false)}
        />
      </Card>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 3, border: '1px solid', borderColor: 'info.main' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Security color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Safety & Support
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Important Notice</AlertTitle>
            This assessment is for educational purposes only and is not a substitute 
            for professional mental health advice, diagnosis, or treatment. If you're 
            experiencing a crisis, please reach out for immediate help.
          </Alert>

          <Stack spacing={2}>
            {/* Crisis Resources */}
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="error"
                size="large"
                startIcon={<Phone />}
                onClick={() => setCrisisDialogOpen(true)}
                sx={{ mb: 2 }}
              >
                Crisis Resources & Support
              </Button>
              
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Available 24/7 • Free & Confidential
              </Typography>
            </Box>

            <Divider />

            {/* Privacy & Data Controls */}
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight={500}>
                  Privacy & Data Controls
                </Typography>
                <IconButton
                  onClick={() => setExpanded(!expanded)}
                  size="small"
                >
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              
              <Collapse in={expanded}>
                <Box sx={{ mt: 2 }}>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Shield />}
                      onClick={() => setPrivacyDialogOpen(true)}
                      fullWidth
                    >
                      Privacy Information
                    </Button>
                    
                    {showDataControls && (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<Download />}
                          onClick={onDataExport}
                          fullWidth
                        >
                          Export My Data
                        </Button>
                        
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                          onClick={onDataDelete}
                          fullWidth
                        >
                          Delete My Data
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
              </Collapse>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CrisisResourcesDialog
        open={crisisDialogOpen}
        onClose={() => setCrisisDialogOpen(false)}
      />
      
      <PrivacyDialog
        open={privacyDialogOpen}
        onClose={() => setPrivacyDialogOpen(false)}
      />
    </motion.div>
  );
}

function CrisisResourcesDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: 'error.main', color: 'white' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Phone />
          Crisis Resources & Support
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Emergency Situations</AlertTitle>
          If you are in immediate danger, please call 911 or go to your nearest emergency room.
        </Alert>

        <Typography variant="h6" gutterBottom>
          Mental Health Crisis Resources
        </Typography>
        
        <List>
          {crisisResources.map((resource, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon>
                <Psychology color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {resource.name}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ my: 1 }}>
                      {resource.phone}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {resource.description}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip label={resource.available} size="small" color="success" />
                      {resource.website && (
                        <Link
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="body2"
                        >
                          Visit Website
                        </Link>
                      )}
                    </Stack>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PrivacyDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Shield />
          Privacy & Data Protection
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={3}>
          <Alert severity="info">
            <AlertTitle>Your Privacy Matters</AlertTitle>
            We are committed to protecting your personal information and maintaining transparency 
            about how your data is used.
          </Alert>

          <Box>
            <Typography variant="h6" gutterBottom>
              Data Collection
            </Typography>
            <Typography variant="body2" paragraph>
              We collect only the information necessary to provide you with personalized insights:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Assessment responses" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Optional demographic information" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Usage analytics (anonymized)" />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Data Security
            </Typography>
            <Typography variant="body2" paragraph>
              Your data is protected using industry-standard security measures:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Encryption in transit and at rest" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Secure cloud infrastructure" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Regular security audits" />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Your Rights
            </Typography>
            <Typography variant="body2" paragraph>
              You have full control over your data:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Export your data at any time" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Request data deletion" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Opt out of analytics" />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
