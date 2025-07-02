import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

type Stat = {
  id: string;
  title: string;
  value: string;
  icon: any;
};

const CompanyStatsScreen = () => {
  const status = '🟢 Actively Hiring'; // You can replace this with dynamic API data

  const stats: Stat[] = [
    {
      id: '1',
      title: 'Jobs Posted',
      value: '42',
      icon: require('../../../assets/icons/manage.png'),
    },
    {
      id: '2',
      title: 'Avg. Applicants/Job',
      value: '87',
      icon: require('../../../assets/icons/manage.png'),
    },
    {
      id: '3',
      title: 'Hiring Success Rate',
      value: '76%',
      icon: require('../../../assets/icons/manage.png'),
    },
    {
      id: '4',
      title: 'Avg. Time to Hire',
      value: '12 Days',
      icon: require('../../../assets/icons/manage.png'),
    },
  ];

  const renderItem = ({ item }: { item: Stat }) => (
    <View style={styles.card}>
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.cardText}>
        <Text style={styles.value}>{item.value}</Text>
        <Text style={styles.label}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏢 Company Statistics Overview</Text>

      {/* Company Status */}
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Company Status:</Text>
        <Text style={styles.statusValue}>{status}</Text>
      </View>

      <FlatList
        data={stats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CompanyStatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2C3E50',
  },
  statusBox: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#388E3C',
  },
  statusValue: {
    fontSize: 16,
    color: '#2E7D32',
    marginTop: 4,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  cardText: {
    flexShrink: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },
});
