import { Tabs } from "expo-router";

const TabsLayout = () => {
    return <Tabs>
        <Tabs.Screen name="index" options={{title: 'Index'}}/>
        <Tabs.Screen name="home" options={{title: 'בית'}}/>
    </Tabs>
};

export default TabsLayout;