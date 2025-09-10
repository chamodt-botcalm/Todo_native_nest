export const Theme = {
  colors: {
    primary: '#6366F1',
    primaryDark: '#4F46E5',
    secondary: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F8FAFC',
    backgroundTertiary: '#F1F5F9',
    
    // Dark mode
    backgroundDark: '#0F172A',
    backgroundSecondaryDark: '#1E293B',
    backgroundTertiaryDark: '#334155',
    
    // Text
    text: '#1E293B',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    
    textDark: '#F8FAFC',
    textSecondaryDark: '#CBD5E1',
    textTertiaryDark: '#94A3B8',
    
    // Borders
    border: '#E2E8F0',
    borderDark: '#475569',
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.3)',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};