import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { config } from '~/lib/config';

interface ProgressIndicatorProps {
  currentSection: number;
  currentQuestion: number;
  totalSections: number;
  totalQuestions: number;
  completionPercentage: number;
  sectionProgress?: number; // Progress within current section
}

export function ProgressIndicator({
  currentSection,
  currentQuestion,
  totalSections,
  totalQuestions,
  completionPercentage,
  sectionProgress = 0,
}: ProgressIndicatorProps) {
  const theme = useTheme();

  // Calculate section-specific progress
  const questionsPerSection = Math.floor(totalQuestions / totalSections);
  const currentSectionProgress = sectionProgress ||
    ((currentQuestion - 1) % questionsPerSection) / questionsPerSection * 100;

  // Get current section info
  const currentSectionInfo = config.assessment.sections.find(s => s.id === currentSection);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          mb: 3,
          background: 'linear-gradient(135deg, rgba(71, 19, 150, 0.05) 0%, rgba(177, 59, 255, 0.05) 100%)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ pb: 2 }}>
          <Stack spacing={2}>
            {/* Header with section and overall progress */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Section {currentSection} of {totalSections}
              </Typography>
              <Chip
                label={`${Math.round(completionPercentage)}% Complete`}
                size="small"
                sx={{
                  background: 'linear-gradient(45deg, #471396 30%, #B13BFF 90%)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Section title */}
            {currentSectionInfo && (
              <Typography variant="h6" color="text.primary" fontWeight={600}>
                {currentSectionInfo.title}
              </Typography>
            )}

            {/* Overall progress bar */}
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Overall Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Question {currentQuestion} of {totalQuestions}
                </Typography>
              </Box>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: 'left' }}
              >
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(45deg, #471396 30%, #B13BFF 90%)',
                      transition: 'transform 0.4s ease-in-out',
                    },
                  }}
                />
              </motion.div>
            </Box>

            {/* Section progress bar */}
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Section Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(currentSectionProgress)}%
                </Typography>
              </Box>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                style={{ transformOrigin: 'left' }}
              >
                <LinearProgress
                  variant="determinate"
                  value={currentSectionProgress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      background: 'linear-gradient(45deg, #FFCC00 30%, #FF9800 90%)',
                      transition: 'transform 0.4s ease-in-out',
                    },
                  }}
                />
              </motion.div>
            </Box>

            {/* Section indicators */}
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Sections
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {config.assessment.sections.map((section) => (
                  <motion.div
                    key={section.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: section.id * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Chip
                      label={section.id}
                      size="small"
                      variant={section.id === currentSection ? "filled" : "outlined"}
                      sx={{
                        minWidth: 32,
                        height: 24,
                        fontSize: '0.75rem',
                        ...(section.id === currentSection && {
                          background: 'linear-gradient(45deg, #471396 30%, #B13BFF 90%)',
                          color: 'white',
                          fontWeight: 600,
                        }),
                        ...(section.id < currentSection && {
                          backgroundColor: theme.palette.success.light,
                          color: theme.palette.success.contrastText,
                          borderColor: theme.palette.success.main,
                        }),
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}