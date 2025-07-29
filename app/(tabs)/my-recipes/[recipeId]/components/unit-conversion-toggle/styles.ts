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
    toggle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.small,
      paddingVertical: SPACING.xs,
      borderRadius: BORDER_RADIUS.small,
      borderWidth: 1,
      borderColor: border,
      backgroundColor: cardBackground,
      marginRight: SPACING.xs,
    },
    toggleActive: {
      borderColor: tint,
      backgroundColor: `${tint}10`,
    },
    toggleLabel: {
      marginLeft: SPACING.xs,
      fontSize: FONT_SIZES.caption,
      color: icon,
    },
    toggleLabelActive: {
      color: tint,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      maxWidth: 300,
      borderRadius: BORDER_RADIUS.medium,
      padding: SPACING.medium,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    modalTitle: {
      fontSize: FONT_SIZES.large,
      fontWeight: '600',
      marginBottom: SPACING.medium,
      textAlign: 'center',
    },
    unitOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SPACING.small,
      paddingHorizontal: SPACING.medium,
      borderRadius: BORDER_RADIUS.small,
      marginBottom: SPACING.xs,
    },
    unitOptionActive: {
      backgroundColor: `${tint}15`,
    },
    unitOptionText: {
      fontSize: FONT_SIZES.medium,
      color: textColor,
    },
    unitOptionTextActive: {
      color: tint,
      fontWeight: '500',
    },
  });

  return { styles, colors: { backgroundColor, textColor, tint, border, icon, cardBackground } };
}