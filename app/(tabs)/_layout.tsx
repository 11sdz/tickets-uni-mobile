import React from "react";
import { Tabs } from "expo-router";
import { Typography } from "../../src/styles";
import Icon from "../../src/components/Icon";

const getTabBarIcon = ({ route, color, size }) => {
    let iconName;
  
    if (route.name === "activity") {
      iconName = "comment"; // FontAwesome icon for 'activity'
    } else if (route.name === "home") {
      iconName = "home"; // FontAwesome icon for 'home'
    }
  
    return <Icon name={iconName} size={size} color={color} />;
  };
  

const TabsLayout = () => {
    return <Tabs screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: "transparent",
        },
        tabBarLabelStyle: {
            ...Typography.typography.medium,
            fontFamily: "Rubik-Medium",
            writingDirection: 'rtl',
        },
        tabBarItemStyle: {
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
        tabBarLabelPosition: "below-icon",
    }}>
        <Tabs.Screen name="activity" options={{title: 'פניות',tabBarIcon: ({ color, size }) => (
            <Icon name="book" size={size} color={color} />
          ),}}/>
        <Tabs.Screen name="home" options={{title: 'בית',tabBarIcon: ({ color, size }) => (
            <Icon name="house" size={size} color={color} />
          ),}}/>
    </Tabs>
};

export default TabsLayout;