import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "./components/FeedScreen";
import ProfileScreen from "./components/ProfileScreen";

const Tab = createMaterialTopTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
