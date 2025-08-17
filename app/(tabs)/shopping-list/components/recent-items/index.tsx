import { BaseShoppingListItem } from "@/src/user/shopping-list";
import { RChildren } from "@/src/utils/types";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { memo, useCallback, useRef, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Animated, 
  Pressable 
} from "react-native";
import { useRecentItems, useHapticFeedback } from "./hooks";
import { useRecentItemsStyles } from "./styles";
import { ANIMATION_CONFIG, ACCESSIBILITY } from "./constants";

type RecentItemsProps = {
  onAddItem?: (item: { name: string; quantity: string }) => void;
  onItemLongPress?: (item: BaseShoppingListItem) => void;
};

export default memo(function RecentItems({ onAddItem, onItemLongPress }: RecentItemsProps) {
  const { recentItems, isLoading } = useRecentItems();
  const { triggerHaptic } = useHapticFeedback();

  const onItemSelect = useCallback(
    (item: BaseShoppingListItem) => {
      triggerHaptic('success');
      if (onAddItem) {
        onAddItem({
          name: item.name,
          quantity: item.quantity.toString(),
        });
      }
    },
    [onAddItem, triggerHaptic],
  );

  const handleItemLongPress = useCallback((item: BaseShoppingListItem) => {
    triggerHaptic('medium');
    if (onItemLongPress) {
      onItemLongPress(item);
    }
  }, [onItemLongPress, triggerHaptic]);

  if (isLoading) {
    return (
      <Root>
        <Root.LoadingState />
      </Root>
    );
  }

  if (!recentItems || recentItems.length === 0) {
    return (
      <Root>
        <Root.EmptyState />
      </Root>
    );
  }

  return (
    <Root>
      <Root.Header title="Recent Items" subtitle="Tap to add quickly" />
      <Root.List
        data={recentItems}
        onItemSelect={onItemSelect}
        onItemLongPress={handleItemLongPress}
        triggerHaptic={triggerHaptic}
      />
    </Root>
  );
});

function Root({ children }: RChildren) {
  const { styles } = useRecentItemsStyles();
  return <View style={styles.container}>{children}</View>;
}

type HeaderProps = {
  title: string;
  subtitle?: string;
};

function Header({ title, subtitle }: HeaderProps) {
  const { styles } = useRecentItemsStyles();
  
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

type ListProps = {
  data: BaseShoppingListItem[];
  onItemSelect?: (item: BaseShoppingListItem) => void;
  onItemLongPress?: (item: BaseShoppingListItem) => void;
  triggerHaptic: (type: keyof typeof import("./constants").HAPTIC_TYPES) => void;
};

function List({ data, onItemSelect, onItemLongPress, triggerHaptic }: ListProps) {
  const { styles } = useRecentItemsStyles();

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item, index }) => (
          <ItemCard
            key={item.id}
            item={item}
            index={index}
            onPress={() => onItemSelect?.(item)}
            onLongPress={() => onItemLongPress?.(item)}
            triggerHaptic={triggerHaptic}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

type ItemCardProps = {
  item: BaseShoppingListItem;
  index: number;
  onPress?: () => void;
  onLongPress?: () => void;
  triggerHaptic: (type: keyof typeof import("./constants").HAPTIC_TYPES) => void;
};

function ItemCard({ item, onPress, onLongPress, triggerHaptic }: ItemCardProps) {
  const { styles } = useRecentItemsStyles();
  const [isPressed, setIsPressed] = useState(false);
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    triggerHaptic('light');
    Animated.spring(animatedValue, {
      toValue: ANIMATION_CONFIG.press.scale,
      ...ANIMATION_CONFIG.spring,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, triggerHaptic]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    Animated.spring(animatedValue, {
      toValue: 1,
      ...ANIMATION_CONFIG.spring,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const cardStyle = [
    styles.cardContainer,
    isPressed && styles.cardPressed,
  ];

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={styles.touchableArea}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={`${ACCESSIBILITY.labels.recentItem}: ${item.name}, ${item.quantity} ${item.unit}`}
        accessibilityHint={ACCESSIBILITY.hints.tapToAdd}
        accessibilityRole="button"
        accessibilityActions={[
          { name: 'activate', label: ACCESSIBILITY.labels.addToList },
          { name: 'longpress', label: ACCESSIBILITY.labels.editItem },
        ]}
        onAccessibilityAction={(event) => {
          switch (event.nativeEvent.actionName) {
            case 'activate':
              onPress?.();
              break;
            case 'longpress':
              onLongPress?.();
              break;
          }
        }}
        accessible={true}
      >
        <View style={cardStyle}>
          <View style={styles.cardContent}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
            </View>

            <View style={styles.itemDetails}>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Text style={styles.unitText}>{item.unit}</Text>
              </View>
            </View>

          </View>

        </View>
      </Pressable>
    </Animated.View>
  );
}

function LoadingState() {
  const { styles } = useRecentItemsStyles();
  
  return (
    <View 
      style={styles.loadingContainer}
      accessibilityLabel="Loading recent items"
      accessibilityLiveRegion="polite"
      accessible={true}
    >
      {[1, 2, 3].map((index) => (
        <View 
          key={index} 
          style={styles.skeletonCard}
          accessibilityElementsHidden={true}
        />
      ))}
    </View>
  );
}

function EmptyState() {
  const { styles, colors } = useRecentItemsStyles();
  
  return (
    <View 
      style={styles.emptyContainer}
      accessibilityLabel="No recent items available"
      accessibilityHint="Add items to your shopping list to see them here for quick access"
      accessible={true}
    >
      <IconSymbol 
        name="clock" 
        size={32} 
        color={colors.icon} 
        style={styles.emptyIcon}
        accessibilityElementsHidden={true}
      />
      <Text 
        style={styles.emptyTitle}
        accessibilityRole="header"
      >
        No Recent Items
      </Text>
      <Text 
        style={styles.emptyMessage}
        accessibilityRole="text"
      >
        Items you add to your shopping list will appear here for quick access
      </Text>
    </View>
  );
}

Root.Header = Header;
Root.List = List;
Root.ItemCard = ItemCard;
Root.LoadingState = LoadingState;
Root.EmptyState = EmptyState;
