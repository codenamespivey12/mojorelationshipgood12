/**
 * Accessibility utilities and testing helpers for WCAG AA compliance
 */

export interface AccessibilityCheckResult {
  passed: boolean;
  issues: string[];
  recommendations: string[];
}

/**
 * Check if an element has proper ARIA labels and roles
 */
export function checkAriaCompliance(element: HTMLElement): AccessibilityCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check for interactive elements without labels
  const interactiveElements = element.querySelectorAll(
    'button, input, select, textarea, [role="button"], [role="tab"], [role="menuitem"]'
  );

  interactiveElements.forEach((el) => {
    const hasLabel = 
      el.getAttribute('aria-label') ||
      el.getAttribute('aria-labelledby') ||
      el.querySelector('label') ||
      (el as HTMLElement).innerText?.trim();

    if (!hasLabel) {
      issues.push(`Interactive element missing accessible label: ${el.tagName}`);
      recommendations.push('Add aria-label, aria-labelledby, or visible text to interactive elements');
    }
  });

  // Check for proper heading hierarchy
  const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0;
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > previousLevel + 1) {
      issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`);
      recommendations.push('Maintain proper heading hierarchy (h1 → h2 → h3, etc.)');
    }
    previousLevel = level;
  });

  // Check for images without alt text
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.getAttribute('alt') && img.getAttribute('alt') !== '') {
      issues.push('Image missing alt attribute');
      recommendations.push('Add descriptive alt text to images or alt="" for decorative images');
    }
  });

  // Check for form controls without labels
  const formControls = element.querySelectorAll('input, select, textarea');
  formControls.forEach((control) => {
    const id = control.getAttribute('id');
    const hasLabel = 
      control.getAttribute('aria-label') ||
      control.getAttribute('aria-labelledby') ||
      (id && element.querySelector(`label[for="${id}"]`));

    if (!hasLabel) {
      issues.push(`Form control missing label: ${control.tagName}`);
      recommendations.push('Associate form controls with labels using for/id or aria-labelledby');
    }
  });

  return {
    passed: issues.length === 0,
    issues,
    recommendations: [...new Set(recommendations)], // Remove duplicates
  };
}

/**
 * Check color contrast ratios for WCAG AA compliance
 */
export function checkColorContrast(element: HTMLElement): AccessibilityCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // This is a simplified check - in a real implementation, you'd use a library
  // like color-contrast-checker or integrate with axe-core
  const textElements = element.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a');
  
  textElements.forEach((el) => {
    const styles = window.getComputedStyle(el as Element);
    const fontSize = parseFloat(styles.fontSize);
    const fontWeight = styles.fontWeight;
    
    // Check if text is large (18pt+ or 14pt+ bold)
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
    
    // For this demo, we'll just check if colors are defined
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    if (color === 'rgba(0, 0, 0, 0)' || backgroundColor === 'rgba(0, 0, 0, 0)') {
      issues.push('Text element may have insufficient color contrast');
      recommendations.push(`Ensure ${isLargeText ? '3:1' : '4.5:1'} contrast ratio for text`);
    }
  });

  return {
    passed: issues.length === 0,
    issues,
    recommendations: [...new Set(recommendations)],
  };
}

/**
 * Check keyboard navigation support
 */
export function checkKeyboardNavigation(element: HTMLElement): AccessibilityCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check for focusable elements
  const focusableElements = element.querySelectorAll(
    'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) {
    issues.push('No focusable elements found');
    recommendations.push('Ensure interactive elements are keyboard accessible');
  }

  // Check for proper tab order
  const tabIndexElements = Array.from(element.querySelectorAll('[tabindex]'));
  const positiveTabIndexes = tabIndexElements
    .map(el => parseInt(el.getAttribute('tabindex') || '0'))
    .filter(index => index > 0);

  if (positiveTabIndexes.length > 0) {
    issues.push('Positive tabindex values found');
    recommendations.push('Avoid positive tabindex values; use 0 or -1 instead');
  }

  // Check for skip links
  const skipLinks = element.querySelectorAll('a[href^="#"]');
  if (skipLinks.length === 0 && element.querySelector('nav')) {
    recommendations.push('Consider adding skip links for keyboard navigation');
  }

  return {
    passed: issues.length === 0,
    issues,
    recommendations: [...new Set(recommendations)],
  };
}

/**
 * Comprehensive accessibility audit
 */
export function auditAccessibility(element: HTMLElement): AccessibilityCheckResult {
  const ariaCheck = checkAriaCompliance(element);
  const contrastCheck = checkColorContrast(element);
  const keyboardCheck = checkKeyboardNavigation(element);

  const allIssues = [
    ...ariaCheck.issues,
    ...contrastCheck.issues,
    ...keyboardCheck.issues,
  ];

  const allRecommendations = [
    ...ariaCheck.recommendations,
    ...contrastCheck.recommendations,
    ...keyboardCheck.recommendations,
  ];

  return {
    passed: allIssues.length === 0,
    issues: allIssues,
    recommendations: [...new Set(allRecommendations)],
  };
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private static focusStack: HTMLElement[] = [];

  static pushFocus(element: HTMLElement) {
    const currentFocus = document.activeElement as HTMLElement;
    if (currentFocus) {
      this.focusStack.push(currentFocus);
    }
    element.focus();
  }

  static popFocus() {
    const previousFocus = this.focusStack.pop();
    if (previousFocus) {
      previousFocus.focus();
    }
  }

  static trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }
}

/**
 * Screen reader announcements
 */
export class ScreenReaderAnnouncer {
  private static liveRegion: HTMLElement | null = null;

  static init() {
    if (!this.liveRegion) {
      this.liveRegion = document.createElement('div');
      this.liveRegion.setAttribute('aria-live', 'polite');
      this.liveRegion.setAttribute('aria-atomic', 'true');
      this.liveRegion.style.position = 'absolute';
      this.liveRegion.style.left = '-10000px';
      this.liveRegion.style.width = '1px';
      this.liveRegion.style.height = '1px';
      this.liveRegion.style.overflow = 'hidden';
      document.body.appendChild(this.liveRegion);
    }
  }

  static announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    this.init();
    if (this.liveRegion) {
      this.liveRegion.setAttribute('aria-live', priority);
      this.liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = '';
        }
      }, 1000);
    }
  }
}

/**
 * Reduced motion detection
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * High contrast detection
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}
