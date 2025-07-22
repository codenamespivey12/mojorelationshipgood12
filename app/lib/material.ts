// Material Web Components configuration and utilities
// import '@material/web/all.js'; // Commented out to avoid server-side issues

// Material Web theme configuration
export const materialTheme = {
  '--md-sys-color-primary': '#B13BFF',
  '--md-sys-color-on-primary': '#FFFFFF',
  '--md-sys-color-primary-container': '#471396',
  '--md-sys-color-on-primary-container': '#FFFFFF',
  '--md-sys-color-secondary': '#090040',
  '--md-sys-color-on-secondary': '#FFFFFF',
  '--md-sys-color-surface': '#FFFFFF',
  '--md-sys-color-on-surface': '#090040',
  '--md-sys-color-surface-variant': '#F5F5F5',
  '--md-sys-color-on-surface-variant': '#471396',
  '--md-sys-color-outline': '#B13BFF',
  '--md-sys-color-outline-variant': '#E0E0E0',
} as const;

// Apply Material theme to document
export function applyMaterialTheme() {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    Object.entries(materialTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }
}

// Material Web component type declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': any;
      'md-outlined-button': any;
      'md-text-button': any;
      'md-filled-text-field': any;
      'md-outlined-text-field': any;
      'md-radio': any;
      'md-checkbox': any;
      'md-slider': any;
      'md-progress-indicator': any;
      'md-linear-progress': any;
      'md-circular-progress': any;
      'md-card': any;
      'md-dialog': any;
      'md-menu': any;
      'md-list': any;
      'md-list-item': any;
      'md-icon': any;
      'md-icon-button': any;
      'md-fab': any;
      'md-chip': any;
      'md-switch': any;
      'md-tabs': any;
      'md-tab': any;
      'md-navigation-bar': any;
      'md-navigation-tab': any;
    }
  }
}