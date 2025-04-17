import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Spacing, Typography } from '../../styles';
import FilterButton from '../buttons/FilterButton'; // Assuming it's here

const width = Dimensions.get("window").width;

type ListHeaderProps = {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  hasTickets: boolean;
};

const ListHeader = ({ statusFilter, setStatusFilter, hasTickets }: ListHeaderProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>פניות בטיפולי:</Text>
      </View>

      {hasTickets && (
        <View style={styles.filtersContainer}>
          <FilterButton title="כל הפניות" isActive={statusFilter === "all"} onPress={() => setStatusFilter("all")} />
          <FilterButton title="פתוחות" isActive={statusFilter === "open"} onPress={() => setStatusFilter("open")} />
          <FilterButton title="טופל" isActive={statusFilter === "completed"} onPress={() => setStatusFilter("completed")} />
          <FilterButton title="לא טופל" isActive={statusFilter === "uncompleted"} onPress={() => setStatusFilter("uncompleted")} />
          <FilterButton title="בטיפול" isActive={statusFilter === "inprogress"} onPress={() => setStatusFilter("inprogress")} />
        </View>
      )}
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    padding: Spacing.spacing.s,
    backgroundColor: Colors.colors.ListHeader,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: Colors.colors.shade,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    borderRadius: 20,
    borderColor: Colors.colors.secondary,
  },
  title: {
    ...Typography.typography.subheading,
    fontFamily: "Rubik-Bold",
    color: Colors.colors.heading,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.spacing.s,
    marginTop: Spacing.spacing.m,
    justifyContent: "center",
  },
});
// Compare this snippet from src/components/ticket/ListHeader.tsx: