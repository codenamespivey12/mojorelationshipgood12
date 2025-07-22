import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  SkipNext,
  Save,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onSave?: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  canSkip?: boolean;
  isLoading?: boolean;
  showSave?: boolean;
  variant?: 'default' | 'floating' | 'minimal';
}

export function NavigationControls({
  onPrevious,
  onNext,
  onSkip,
  onSave,
  canGoBack,
  canGoNext,
  canSkip = false,
  isLoading = false,
  showSave = false,
  variant = 'default',
}: NavigationControlsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (canGoBack && !isLoading) {
            event.preventDefault();
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (canGoNext && !isLoading) {
            event.preventDefault();
            onNext();
          }
          break;
        case 'Enter':
          if (canGoNext && !isLoading) {
            event.preventDefault();
            onNext();
          }
          break;
        case 'Escape':
          if (canSkip && onSkip && !isLoading) {
            event.preventDefault();
            onSkip();
          }
          break;
        case 's':
          if ((event.ctrlKey || event.metaKey) && onSave && !isLoading) {
            event.preventDefault();
            onSave();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, canGoNext, canSkip, isLoading, onPrevious, onNext, onSkip, onSave]);

  if (variant === 'floating') {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Stack direction="row" spacing={2}>
          {canGoBack && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Tooltip title="Previous (←)" placement="top">
                <Fab
                  color="secondary"
                  onClick={onPrevious}
                  disabled={isLoading}
                  size={isMobile ? 'medium' : 'large'}
                >
                  <ArrowBack />
                </Fab>
              </Tooltip>
            </motion.div>
          )}
          
          {canGoNext && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Tooltip title="Next (→)" placement="top">
                <Fab
                  color="primary"
                  onClick={onNext}
                  disabled={isLoading}
                  size={isMobile ? 'medium' : 'large'}
                >
                  <ArrowForward />
                </Fab>
              </Tooltip>
            </motion.div>
          )}
        </Stack>
      </Box>
    );
  }

  if (variant === 'minimal') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          startIcon={<KeyboardArrowLeft />}
          onClick={onPrevious}
          disabled={!canGoBack || isLoading}
          variant="text"
          sx={{ visibility: canGoBack ? 'visible' : 'hidden' }}
        >
          Back
        </Button>
        
        <Button
          endIcon={<KeyboardArrowRight />}
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          variant="text"
          sx={{ visibility: canGoNext ? 'visible' : 'hidden' }}
        >
          Next
        </Button>
      </Box>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Left side - Previous button */}
        <Box>
          {canGoBack ? (
            <Tooltip title="Previous question (←)" placement="top">
              <Button
                startIcon={<ArrowBack />}
                onClick={onPrevious}
                disabled={isLoading}
                variant="outlined"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  minWidth: 120,
                  borderColor: theme.palette.grey[300],
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: 'rgba(71, 19, 150, 0.04)',
                  },
                }}
              >
                Previous
              </Button>
            </Tooltip>
          ) : (
            <Box sx={{ width: 120 }} /> // Spacer to maintain layout
          )}
        </Box>

        {/* Center - Skip and Save buttons */}
        <Stack direction="row" spacing={2}>
          {canSkip && onSkip && (
            <Tooltip title="Skip this question (Esc)" placement="top">
              <Button
                startIcon={<SkipNext />}
                onClick={onSkip}
                disabled={isLoading}
                variant="text"
                color="secondary"
                size={isMobile ? 'small' : 'medium'}
              >
                Skip
              </Button>
            </Tooltip>
          )}
          
          {showSave && onSave && (
            <Tooltip title="Save progress (Ctrl+S)" placement="top">
              <Button
                startIcon={<Save />}
                onClick={onSave}
                disabled={isLoading}
                variant="text"
                color="secondary"
                size={isMobile ? 'small' : 'medium'}
              >
                Save
              </Button>
            </Tooltip>
          )}
        </Stack>

        {/* Right side - Next button */}
        <Box>
          {canGoNext ? (
            <Tooltip title="Next question (→ or Enter)" placement="top">
              <Button
                endIcon={<ArrowForward />}
                onClick={onNext}
                disabled={isLoading}
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  minWidth: 120,
                  background: 'linear-gradient(45deg, #471396 30%, #B13BFF 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #3a0f7a 30%, #9a32d9 90%)',
                  },
                  '&:disabled': {
                    background: theme.palette.grey[300],
                  },
                }}
              >
                Next
              </Button>
            </Tooltip>
          ) : (
            <Box sx={{ width: 120 }} /> // Spacer to maintain layout
          )}
        </Box>
      </Box>

      {/* Keyboard shortcuts hint */}
      {!isMobile && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Box
              component="span"
              sx={{
                fontSize: '0.75rem',
                color: 'text.secondary',
                backgroundColor: 'background.default',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              Use ← → arrow keys or Enter to navigate
              {canSkip && ' • Esc to skip'}
              {showSave && ' • Ctrl+S to save'}
            </Box>
          </motion.div>
        </Box>
      )}
    </motion.div>
  );
}
