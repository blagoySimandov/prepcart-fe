import { BaseShoppingListItem } from "@/src/user/shopping-list";
import { RChildren } from "@/src/utils/types";
import { memo, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { useRecentItems } from "./hooks";
import { styles } from "./styles";

type RecentItemsProps = {
  onAddItem?: (item: { name: string; quantity: string }) => void;
  onItemLongPress?: (item: BaseShoppingListItem) => void;
};

export default memo(function RecentItems({ onAddItem, onItemLongPress }: RecentItemsProps) {
  const { recentItems, isLoading } = useRecentItems();

  const onItemSelect = useCallback(
    (item: BaseShoppingListItem) => {
      if (onAddItem) {
        onAddItem({
          name: item.name,
          quantity: item.quantity.toString(),
        });
      }
    },
    [onAddItem],
  );

  const handleItemLongPress = useCallback((item: BaseShoppingListItem) => {
    if (onItemLongPress) {
      onItemLongPress(item);
    }
  }, [onItemLongPress]);

  if (isLoading || !recentItems || recentItems.length === 0) {
    return null;
  }

  return (
    <Root>
      <Root.List
        data={recentItems}
        onItemSelect={onItemSelect}
        onItemLongPress={handleItemLongPress}
      />
    </Root>
  );
});

function Root({ children }: RChildren) {
  return <View style={styles.container}>{children}</View>;
}

type ListProps = {
  data: BaseShoppingListItem[];
  onItemSelect?: (item: BaseShoppingListItem) => void;
  onItemLongPress?: (item: BaseShoppingListItem) => void;
};

function List({ data, onItemSelect, onItemLongPress }: ListProps) {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Chip
          key={item.id}
          onPress={() => onItemSelect?.(item)}
          onLongPress={() => onItemLongPress?.(item)}
        >
          {`${item.name} • (${item.quantity} ${item.unit})`}
        </Chip>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

type ChipProps = RChildren & {
  onPress?: () => void;
  onLongPress?: () => void;
};

function Chip({ children, onPress, onLongPress }: ChipProps) {
  return (
    <Text style={styles.chip} onPress={onPress} onLongPress={onLongPress}>
      {children}
    </Text>
  );
}

Root.Chip = Chip;
Root.List = List;
