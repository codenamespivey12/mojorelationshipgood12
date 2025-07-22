import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  StepIcon,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  PlayCircleFilled,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { config } from '~/lib/config';

interface SectionSelectorProps {
  currentSection: number;
  completedSections: number[];
  onSectionSelect: (sectionId: number) => void;
  allowNavigation?: boolean;
}

interface CustomStepIconProps {
  active: boolean;
  completed: boolean;
  icon: React.ReactNode;
}

function CustomStepIcon({ active, completed, icon }: CustomStepIconProps) {
  const theme = useTheme();
  
  if (completed) {
    return (
      <CheckCircle
        sx={{
          color: theme.palette.success.main,
          fontSize: 28,
        }}
      />
    );
  }
  
  if (active) {
    return (
      <PlayCircleFilled
        sx={{
          color: theme.palette.primary.main,
          fontSize: 28,
        }}
      />
    );
  }
  
  return (
    <RadioButtonUnchecked
      sx={{
        color: theme.palette.grey[400],
        fontSize: 28,
      }}
    />
  );
}

export function SectionSelector({
  currentSection,
  completedSections,
  onSectionSelect,
  allowNavigation = true,
}: SectionSelectorProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSectionClick = (sectionId: number) => {
    if (!allowNavigation) return;
    
    // Allow navigation to current section, completed sections, or next section
    const canNavigate = 
      sectionId === currentSection ||
      completedSections.includes(sectionId) ||
      sectionId === Math.max(...completedSections, 0) + 1;
    
    if (canNavigate) {
      onSectionSelect(sectionId);
    }
  };

  const getSectionStatus = (sectionId: number) => {
    if (completedSections.includes(sectionId)) return 'completed';
    if (sectionId === currentSection) return 'active';
    if (sectionId === Math.max(...completedSections, 0) + 1) return 'available';
    return 'locked';
  };

  const getSectionColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'active':
        return theme.palette.primary.main;
      case 'available':
        return theme.palette.grey[600];
      default:
        return theme.palette.grey[400];
    }
  };

  if (isMobile) {
    // Mobile: Horizontal scrollable chips
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mb: 3, overflow: 'visible' }}>
          <CardContent sx={{ pb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Assessment Sections
            </Typography>
            <Box sx={{ overflowX: 'auto', pb: 1 }}>
              <Stack direction="row" spacing={1} sx={{ minWidth: 'max-content' }}>
                {config.assessment.sections.map((section) => {
                  const status = getSectionStatus(section.id);
                  const isClickable = allowNavigation && status !== 'locked';
                  
                  return (
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
                        label={`${section.id}. ${section.title}`}
                        onClick={isClickable ? () => handleSectionClick(section.id) : undefined}
                        variant={status === 'active' ? 'filled' : 'outlined'}
                        sx={{
                          minWidth: 120,
                          height: 40,
                          fontSize: '0.875rem',
                          cursor: isClickable ? 'pointer' : 'default',
                          transition: 'all 0.2s ease-in-out',
                          ...(status === 'completed' && {
                            backgroundColor: theme.palette.success.light,
                            color: theme.palette.success.contrastText,
                            borderColor: theme.palette.success.main,
                          }),
                          ...(status === 'active' && {
                            background: 'linear-gradient(45deg, #471396 30%, #B13BFF 90%)',
                            color: 'white',
                            fontWeight: 600,
                          }),
                          ...(status === 'locked' && {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                          }),
                          '&:hover': isClickable ? {
                            transform: 'scale(1.05)',
                            boxShadow: theme.shadows[4],
                          } : {},
                        }}
                      />
                    </motion.div>
                  );
                })}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Desktop: Vertical stepper
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assessment Sections
          </Typography>
          <Stepper orientation="vertical" nonLinear>
            {config.assessment.sections.map((section) => {
              const status = getSectionStatus(section.id);
              const isClickable = allowNavigation && status !== 'locked';
              const isCompleted = status === 'completed';
              const isActive = status === 'active';
              
              return (
                <Step key={section.id} completed={isCompleted} active={isActive}>
                  <StepButton
                    onClick={isClickable ? () => handleSectionClick(section.id) : undefined}
                    disabled={!isClickable}
                    sx={{
                      '& .MuiStepLabel-root': {
                        cursor: isClickable ? 'pointer' : 'default',
                      },
                      '&:hover': isClickable ? {
                        backgroundColor: 'rgba(71, 19, 150, 0.04)',
                      } : {},
                    }}
                  >
                    <StepLabel
                      StepIconComponent={(props) => (
                        <CustomStepIcon
                          active={isActive}
                          completed={isCompleted}
                          icon={props.icon}
                        />
                      )}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: isActive ? 600 : 400,
                            color: getSectionColor(status),
                          }}
                        >
                          {section.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {section.questionCount} questions
                        </Typography>
                        {status === 'completed' && (
                          <Chip
                            label="Completed"
                            size="small"
                            sx={{
                              mt: 1,
                              backgroundColor: theme.palette.success.light,
                              color: theme.palette.success.contrastText,
                              fontSize: '0.75rem',
                              height: 20,
                            }}
                          />
                        )}
                        {status === 'active' && (
                          <Chip
                            label="In Progress"
                            size="small"
                            sx={{
                              mt: 1,
                              background: 'linear-gradient(45deg, #471396 30%, #B13BFF 90%)',
                              color: 'white',
                              fontSize: '0.75rem',
                              height: 20,
                            }}
                          />
                        )}
                        {status === 'locked' && (
                          <Chip
                            label="Locked"
                            size="small"
                            sx={{
                              mt: 1,
                              backgroundColor: theme.palette.grey[200],
                              color: theme.palette.grey[600],
                              fontSize: '0.75rem',
                              height: 20,
                            }}
                          />
                        )}
                      </Box>
                    </StepLabel>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </CardContent>
      </Card>
    </motion.div>
  );
}
