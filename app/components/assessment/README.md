# Assessment Components

This directory contains the core UI components for the Relationship Mojo assessment flow. All components are built with accessibility, keyboard navigation, and responsive design as primary concerns.

## Components Overview

### QuestionCard
The main component for displaying assessment questions with support for multiple question types.

**Features:**
- Multiple choice questions with radio buttons
- Free text questions with character limits
- Yes/No questions with optional comments
- Multiple choice with "Other" option
- Automatic validation and error handling
- Smooth animations and transitions
- Full keyboard navigation support
- Screen reader compatibility

**Accessibility:**
- WCAG AA compliant
- Proper ARIA labels and roles
- Keyboard navigation with arrow keys
- Focus management
- Screen reader announcements
- Required field indicators

### ProgressIndicator
Enhanced progress tracking component showing both section and overall completion.

**Features:**
- Overall assessment progress
- Current section progress
- Visual section indicators
- Smooth animated progress bars
- Responsive design for mobile/desktop
- Section completion status

**Accessibility:**
- Progress bars with proper ARIA attributes
- Clear progress announcements
- High contrast support
- Reduced motion support

### SectionSelector
Navigation component allowing users to jump between assessment sections.

**Features:**
- Desktop: Vertical stepper layout
- Mobile: Horizontal scrollable chips
- Section status indicators (completed, active, locked)
- Smart navigation permissions
- Visual completion feedback
- Smooth animations

**Accessibility:**
- Keyboard navigation between sections
- Clear status announcements
- Focus management
- Proper button roles and labels

### NavigationControls
Comprehensive navigation component with keyboard shortcuts and multiple variants.

**Features:**
- Previous/Next navigation
- Skip functionality for optional questions
- Save progress option
- Keyboard shortcuts (←/→ arrows, Enter, Esc)
- Multiple display variants (default, floating, minimal)
- Loading states and disabled states

**Accessibility:**
- Full keyboard navigation
- Keyboard shortcut hints
- Proper button labels and tooltips
- Focus management
- Screen reader compatible

### SafetyFeatures
Critical safety component providing crisis resources and data privacy controls.

**Features:**
- 24/7 crisis hotline information
- Mental health resources
- Data export/deletion controls
- Privacy information dialog
- Multiple display variants
- Always accessible floating button

**Accessibility:**
- High contrast crisis button
- Clear emergency information
- Keyboard accessible dialogs
- Screen reader optimized
- Focus trap in dialogs

## Usage Examples

### Basic Assessment Flow
```tsx
import { QuestionCard, ProgressIndicator, NavigationControls } from '~/components/assessment';

function AssessmentPage() {
  return (
    <Container>
      <ProgressIndicator
        currentSection={1}
        currentQuestion={5}
        totalSections={5}
        totalQuestions={50}
        completionPercentage={40}
      />
      
      <QuestionCard
        question={currentQuestion}
        currentAnswer={currentAnswer}
        onAnswer={handleAnswer}
        questionNumber={5}
        totalQuestions={10}
      />
      
      <NavigationControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoBack={true}
        canGoNext={true}
      />
    </Container>
  );
}
```

### With Section Navigation
```tsx
import { SectionSelector, SafetyFeatures } from '~/components/assessment';

function FullAssessmentLayout() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SectionSelector
          currentSection={2}
          completedSections={[1]}
          onSectionSelect={handleSectionSelect}
        />
        <SafetyFeatures variant="compact" />
      </Grid>
      
      <Grid item xs={12} md={9}>
        {/* Main assessment content */}
      </Grid>
    </Grid>
  );
}
```

## Keyboard Navigation

All components support comprehensive keyboard navigation:

- **Arrow Keys**: Navigate between options, sections
- **Tab/Shift+Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons, select options
- **Escape**: Skip questions, close dialogs
- **Ctrl+S**: Save progress (where applicable)

## Accessibility Features

### WCAG AA Compliance
- Color contrast ratios meet 4.5:1 minimum
- All interactive elements have accessible names
- Proper heading hierarchy maintained
- Focus indicators clearly visible
- Error messages are descriptive and helpful

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels and roles
- Live regions for dynamic content
- Descriptive button and link text
- Progress announcements

### Keyboard Navigation
- All functionality available via keyboard
- Logical tab order maintained
- Focus management between components
- Keyboard shortcuts documented
- Focus trapping in modals

### Responsive Design
- Mobile-first approach
- Touch-friendly targets (44px minimum)
- Readable text at all zoom levels
- Horizontal scrolling avoided
- Adaptive layouts for different screen sizes

## Testing

### Accessibility Testing
```bash
# Run accessibility tests
npm test -- assessment/__tests__/integration.test.tsx

# Manual testing checklist:
# 1. Navigate entire flow using only keyboard
# 2. Test with screen reader (NVDA, JAWS, VoiceOver)
# 3. Verify color contrast in high contrast mode
# 4. Test with 200% zoom
# 5. Verify reduced motion preferences
```

### Browser Testing
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Components use React.memo for optimization
- Framer Motion animations respect reduced motion
- Lazy loading for non-critical components
- Efficient re-rendering with proper dependencies
- Bundle size optimized with tree shaking

## Customization

### Theming
Components use Material-UI's theming system and can be customized via:
```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#471396',
    },
    secondary: {
      main: '#B13BFF',
    },
  },
});
```

### Variants
Most components support multiple variants for different use cases:
- `variant="default"` - Full featured
- `variant="compact"` - Space-saving
- `variant="minimal"` - Essential features only
- `variant="floating"` - Overlay/floating display

## Error Handling

- Graceful degradation for missing data
- User-friendly error messages
- Automatic error recovery where possible
- Validation feedback in real-time
- Network error handling with retry options

## Future Enhancements

- Voice navigation support
- Enhanced analytics tracking
- Offline mode improvements
- Additional question types
- Advanced progress visualization
- Multi-language support

## Contributing

When adding new features or modifying components:

1. Maintain WCAG AA compliance
2. Add comprehensive tests
3. Update documentation
4. Test with keyboard and screen readers
5. Verify responsive design
6. Check performance impact

For questions or issues, please refer to the main project documentation or create an issue in the project repository.
