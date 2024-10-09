import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';

type MenuItemType = {
  id: number;
  title: string;
  description: string;
  price: string;
};

type MenuType = {
  Starters: MenuItemType[];
  Mains: MenuItemType[];
  Desserts: MenuItemType[];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 45,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  courseSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuItem: {
    marginBottom: 15,
  },
  menuTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 30,
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  menuPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
});

type MenuItemProps = {
  item: MenuItemType;
  onEdit: (id: number, field: string, value: string) => void;
  onRemove: (id: number) => void;
  editing: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ item, onEdit, onRemove, editing }) => (
  <View style={styles.menuItem}>
    {editing ? (
      <>
        <TextInput
          style={styles.menuTitle}
          value={item.title}
          onChangeText={(text) => onEdit(item.id, 'title', text)}
        />
        <TextInput
          style={styles.menuDescription}
          value={item.description}
          onChangeText={(text) => onEdit(item.id, 'description', text)}
        />
        <TextInput
          style={styles.menuPrice}
          value={item.price}
          onChangeText={(text) => onEdit(item.id, 'price', text)}
        />
        <Button title="Remove" onPress={() => onRemove(item.id)} color="#FF6347" />
      </>
    ) : (
      <>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <Text style={styles.menuPrice}>{item.price}</Text>
      </>
    )}
  </View>
);

const MenuScreen: React.FC = () => {
  const [menu, setMenu] = useState<MenuType>({
    Starters: [
      { id: 1, title: 'Creamy Garlic Snails', description: 'Garlic sauce with bread', price: 'R72' },
      { id: 2, title: 'Chicken Trinchado', description: 'Pan-fried with peri peri', price: 'R99' },
    ],
    Mains: [
      { id: 3, title: 'Bacon and Cheese Burger', description: 'Bacon, cheddar, and chips', price: 'R165' },
      { id: 4, title: 'Alfredo Pasta', description: 'Ham and mushroom sauce', price: 'R124' },
    ],
    Desserts: [
      { id: 5, title: 'Chocolate Brownie', description: 'Served with vanilla ice cream', price: 'R89' },
      { id: 6, title: 'Trio of Ice Cream', description: 'Vanilla, chocolate, and strawberry', price: 'R76' },
    ],
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const handleAddDish = () => {
    const newDish: MenuItemType = {
      id: Math.max(...Object.values(menu).flat().map((item) => item.id)) + 1,
      title: 'New Dish',
      description: 'Description here...',
      price: 'R0',
    };

    const updatedMenu = { ...menu };
    updatedMenu.Starters.push(newDish);
    setMenu(updatedMenu);
  };

  const handleEdit = (id: number, field: string, value: string) => {
    const updatedMenu = { ...menu };
    Object.keys(updatedMenu).forEach((course) => {
      updatedMenu[course as keyof MenuType] = updatedMenu[course as keyof MenuType].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );
    });
    setMenu(updatedMenu);
  };

  const handleRemove = (id: number) => {
    const updatedMenu = { ...menu };
    Object.keys(updatedMenu).forEach((course) => {
      updatedMenu[course as keyof MenuType] = updatedMenu[course as keyof MenuType].filter((item) => item.id !== id);
    });
    setMenu(updatedMenu);
  };

  const getFilteredMenu = () => {
    if (selectedCourse === 'All') {
      return Object.keys(menu).map((course) => (
        <View key={course}>
          <Text style={styles.sectionTitle}>{course}</Text>
          {menu[course as keyof MenuType].map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onRemove={handleRemove}
              editing={editing}
            />
          ))}
        </View>
      ));
    } else {
      return (
        <View key={selectedCourse}>
          <Text style={styles.sectionTitle}>{selectedCourse}</Text>
          {menu[selectedCourse as keyof MenuType].map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onRemove={handleRemove}
              editing={editing}
            />
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Christoffel's</Text>
      <Text style={styles.title}>Today's Menu</Text>
      <Button title="Add Items" onPress={handleAddDish} color="#32CD32" />
      <Button title={editing ? 'Done Editing' : 'Edit Menu'} onPress={() => setEditing(!editing)} color="#007BFF" />
      <View style={styles.courseSelection}>
        <Button title="All Courses" onPress={() => setSelectedCourse('All')} color={selectedCourse === 'All' ? '#FF6347' : '#841584'} />
        {Object.keys(menu).map((course) => (
          <Button key={course} title={course} onPress={() => setSelectedCourse(course)} color={selectedCourse === course ? '#FF6347' : '#841584'} />
        ))}
      </View>
      <ScrollView style={styles.menuContainer}>{getFilteredMenu()}</ScrollView>
    </View>
  );
};

export default MenuScreen;