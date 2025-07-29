import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/ui';

export function useStyles() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const icon = useThemeColor({}, 'icon');
  const cardBackground = useThemeColor({}, 'cardBackground');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.small,
      paddingVertical: SPACING.xs,
      borderRadius: BORDER_RADIUS.small,
      borderWidth: 1,
      borderColor: border,
      backgroundColor: cardBackground,
      gap: SPACING.xs,
    },
    containerActive: {
      borderColor: tint,
      backgroundColor: `${tint}10`,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    label: {
      fontSize: FONT_SIZES.small,
      color: textColor,
      fontWeight: '500',
    },
    labelActive: {
      color: tint,
    },
  });

  return { styles, colors: { backgroundColor, textColor, tint, border, icon, cardBackground } };
}