import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
    return <Tabs >
        <Tabs.Screen name="activity" options={{title: 'פניות'}}/>
        <Tabs.Screen name="home" options={{title: 'בית'}}/>
    </Tabs>
};

export default TabsLayout;