import { BaseShoppingListItem } from "@/src/user/shopping-list";
import { RChildren } from "@/src/utils/types";
import { memo } from "react";
import { View, Text, FlatList } from "react-native";
import { useRecentItems } from "./hooks";
import { styles } from "./styles";

type RecentItemsProps = {
  onItemSelect?: (item: BaseShoppingListItem) => void;
};

export default memo(function RecentItems({ onItemSelect }: RecentItemsProps) {
  const { recentItems, isLoading } = useRecentItems();

  if (isLoading || !recentItems || recentItems.length === 0) {
    return null;
  }

  return (
    <Root>
      <Root.List data={recentItems} onItemSelect={onItemSelect} />
    </Root>
  );
});

function Root({ children }: RChildren) {
  return <View style={styles.container}>{children}</View>;
}

type ListProps = {
  data: BaseShoppingListItem[];
  onItemSelect?: (item: BaseShoppingListItem) => void;
};

function List({ data, onItemSelect }: ListProps) {
  const handleItemPress = (item: BaseShoppingListItem) => {
    onItemSelect?.(item);
  };

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Chip key={item.id} onPress={() => handleItemPress(item)}>
          {`${item.name} • (${item.quantity} ${item.unit})`}
        </Chip>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

type ChipProps = RChildren & {
  onPress?: () => void;
};

function Chip({ children, onPress }: ChipProps) {
  return (
    <Text style={styles.chip} onPress={onPress}>
      {children}
    </Text>
  );
}

Root.Chip = Chip;
Root.List = List;
