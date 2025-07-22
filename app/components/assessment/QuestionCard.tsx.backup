import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Collapse,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import type { Question, QuestionResponse } from '~/types/assessment';

interface QuestionCardProps {
  question: Question;
  currentAnswer: QuestionResponse | null;
  onAnswer: (answer: QuestionResponse) => void;
  questionNumber: number;
  totalQuestions: number;
  isRequired?: boolean;
}

export function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
  isRequired = true,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    currentAnswer?.selected_option || ''
  );
  const [answerText, setAnswerText] = useState<string>(
    currentAnswer?.answer_text || ''
  );
  const [elaborationText, setElaborationText] = useState<string>(
    currentAnswer?.elaboration_text || ''
  );
  const [showOtherField, setShowOtherField] = useState<boolean>(
    currentAnswer?.selected_option === 'other' || false
  );
  const [error, setError] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setError('');
    
    // Show/hide "other" text field for multiple choice with other option
    if (question.questionType === 'multiple_choice_plus_text') {
      setShowOtherField(value === 'other');
      if (value !== 'other') {
        setElaborationText('');
      }
    }

    // Auto-submit for simple multiple choice
    if (question.questionType === 'multiple_choice') {
      submitAnswer(value, answerText, elaborationText);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAnswerText(value);
    setError('');
  };

  const handleElaborationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setElaborationText(value);
    setError('');
  };

  const validateAnswer = (): boolean => {
    if (!isRequired) return true;

    switch (question.questionType) {
      case 'multiple_choice':
        return selectedOption !== '';
      case 'free_text':
        return answerText.trim() !== '';
      case 'yes_no_comment':
        return selectedOption !== '';
      case 'multiple_choice_plus_text':
        if (selectedOption === '') return false;
        if (selectedOption === 'other' && elaborationText.trim() === '') return false;
        return true;
      default:
        return false;
    }
  };

  const submitAnswer = (
    option: string = selectedOption,
    text: string = answerText,
    elaboration: string = elaborationText
  ) => {
    if (!validateAnswer()) {
      setError('This question is required. Please provide an answer.');
      return;
    }

    const response: QuestionResponse = {
      section_id: question.sectionId,
      section_title: question.sectionTitle,
      question_id: question.id,
      question_text: question.questionText,
      question_type: question.questionType,
      selected_option: option || null,
      answer_text: text || null,
      elaboration_text: elaboration || null,
    };

    onAnswer(response);
  };

  const handleSubmit = () => {
    submitAnswer();
  };

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case 'multiple_choice':
        return (
          <FormControl component="fieldset" fullWidth error={!!error}>
            <RadioGroup
              value={selectedOption}
              onChange={handleOptionChange}
              name={`question-${question.id}`}
            >
              {question.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{
                    mb: 1,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1rem',
                      lineHeight: 1.5,
                    },
                  }}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'free_text':
        return (
          <Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={answerText}
              onChange={handleTextChange}
              placeholder="Share your thoughts..."
              variant="outlined"
              error={!!error}
              helperText={error || `${answerText.length}/500 characters`}
              inputProps={{ maxLength: 500 }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!validateAnswer()}
              sx={{ mt: 1 }}
            >
              Submit Answer
            </Button>
          </Box>
        );

      case 'yes_no_comment':
        return (
          <Box>
            <FormControl component="fieldset" fullWidth error={!!error}>
              <RadioGroup
                value={selectedOption}
                onChange={handleOptionChange}
                name={`question-${question.id}`}
                row
                sx={{ mb: 2 }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
            
            <TextField
              fullWidth
              multiline
              rows={3}
              value={elaborationText}
              onChange={handleElaborationChange}
              placeholder="Please elaborate on your answer..."
              variant="outlined"
              label="Additional Comments"
              inputProps={{ maxLength: 300 }}
              helperText={`${elaborationText.length}/300 characters`}
              sx={{ mb: 2 }}
            />
            
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!validateAnswer()}
              sx={{ mt: 1 }}
            >
              Submit Answer
            </Button>
          </Box>
        );

      case 'multiple_choice_plus_text':
        return (
          <Box>
            <FormControl component="fieldset" fullWidth error={!!error}>
              <RadioGroup
                value={selectedOption}
                onChange={handleOptionChange}
                name={`question-${question.id}`}
              >
                {question.options?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.toLowerCase()}
                    control={<Radio />}
                    label={option}
                    sx={{
                      mb: 1,
                      '& .MuiFormControlLabel-label': {
                        fontSize: '1rem',
                        lineHeight: 1.5,
                      },
                    }}
                  />
                ))}
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  sx={{
                    mb: 1,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1rem',
                      lineHeight: 1.5,
                    },
                  }}
                />
              </RadioGroup>
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>

            <Collapse in={showOtherField}>
              <TextField
                fullWidth
                value={elaborationText}
                onChange={handleElaborationChange}
                placeholder="Please specify..."
                variant="outlined"
                label="Please specify"
                inputProps={{ maxLength: 200 }}
                helperText={`${elaborationText.length}/200 characters`}
                sx={{ mt: 2, mb: 2 }}
              />
            </Collapse>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!validateAnswer()}
              sx={{ mt: 1 }}
            >
              Submit Answer
            </Button>
          </Box>
        );

      default:
        return <Typography color="error">Unsupported question type</Typography>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          mb: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Question {questionNumber} of {totalQuestions}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.4,
                  mb: 3,
                }}
              >
                {question.questionText}
                {isRequired && (
                  <Typography
                    component="span"
                    color="error"
                    sx={{ ml: 0.5 }}
                  >
                    *
                  </Typography>
                )}
              </Typography>
            </Box>

            {renderQuestionContent()}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
