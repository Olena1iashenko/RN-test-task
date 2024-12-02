import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createMaterialTopTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 20, color: "#ecf0f1" },
        tabBarStyle: { backgroundColor: "#95a5a6" },
      }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
