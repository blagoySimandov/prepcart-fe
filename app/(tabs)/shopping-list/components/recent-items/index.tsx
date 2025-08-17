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
import { useRecentItems, useHapticFeedback, useCollapsibleSection } from "./hooks";
import { useRecentItemsStyles } from "./styles";
import { ANIMATION_CONFIG, ACCESSIBILITY, COLLAPSIBLE } from "./constants";

type RecentItemsProps = {
  onAddItem?: (item: { name: string; quantity: string }) => void;
  onItemLongPress?: (item: BaseShoppingListItem) => void;
};

export default memo(function RecentItems({ onAddItem, onItemLongPress }: RecentItemsProps) {
  const { recentItems, isLoading } = useRecentItems();
  const { triggerHaptic } = useHapticFeedback();
  const { isCollapsed, toggleCollapsed, chevronRotation, opacityAnim } = useCollapsibleSection();

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

  const handleToggleCollapsed = useCallback(() => {
    triggerHaptic('light');
    toggleCollapsed();
  }, [triggerHaptic, toggleCollapsed]);

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
      <Root.Header 
        title="Recent Items" 
        subtitle="Tap to add quickly"
        isCollapsed={isCollapsed}
        onToggleCollapsed={handleToggleCollapsed}
        chevronRotation={chevronRotation}
        opacityAnim={opacityAnim}
      />
      <Root.CollapsibleContent opacityAnim={opacityAnim} isCollapsed={isCollapsed}>
        <Root.List
          data={recentItems}
          onItemSelect={onItemSelect}
          onItemLongPress={handleItemLongPress}
          triggerHaptic={triggerHaptic}
        />
      </Root.CollapsibleContent>
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
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
  chevronRotation: Animated.AnimatedInterpolation<string | number>;
  opacityAnim: Animated.Value;
};

function Header({ title, subtitle, isCollapsed, onToggleCollapsed, chevronRotation, opacityAnim }: HeaderProps) {
  const { styles, colors } = useRecentItemsStyles();
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <View style={styles.sectionHeader}>
      <Pressable 
        style={[styles.sectionTitleRow, isPressed && styles.sectionTitleRowPressed]}
        onPress={onToggleCollapsed}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        accessibilityLabel={isCollapsed ? ACCESSIBILITY.labels.expandSection : ACCESSIBILITY.labels.collapseSection}
        accessibilityHint={ACCESSIBILITY.hints.tapToToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: !isCollapsed }}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <IconSymbol 
            name="chevron.down" 
            size={16} 
            color={colors.icon} 
          />
        </Animated.View>
      </Pressable>
      {subtitle && (
        <Animated.View
          style={[
            styles.sectionSubtitleContainer,
            {
              opacity: opacityAnim,
              transform: [{
                translateY: opacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0]
                })
              }]
            }
          ]}
          pointerEvents={isCollapsed ? 'none' : 'auto'}
        >
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </Animated.View>
      )}
    </View>
  );
}

type CollapsibleContentProps = RChildren & {
  opacityAnim: Animated.Value;
  isCollapsed: boolean;
};

function CollapsibleContent({ children, opacityAnim, isCollapsed }: CollapsibleContentProps) {
  const { styles } = useRecentItemsStyles();
  const [contentHeight, setContentHeight] = useState(120); // Better default height

  const animatedHeight = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight], // Animate from 0 to measured height
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.collapsibleContent}>
      {/* Hidden measurement view - always present but invisible */}
      <View
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (height !== contentHeight && height > 0) {
            setContentHeight(height);
          }
        }}
      >
        {children}
      </View>
      
      {/* Animated visible content */}
      <Animated.View 
        style={{
          height: animatedHeight,
          opacity: opacityAnim,
          overflow: 'hidden',
          transform: [{
            translateY: opacityAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-30, 0] // Slides down from just above
            })
          }]
        }}
        pointerEvents={isCollapsed ? 'none' : 'auto'}
      >
        {children}
      </Animated.View>
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
Root.CollapsibleContent = CollapsibleContent;
Root.List = List;
Root.ItemCard = ItemCard;
Root.LoadingState = LoadingState;
Root.EmptyState = EmptyState;
