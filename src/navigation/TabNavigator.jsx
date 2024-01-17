import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../global/colors";
import OrdersNavigator from "./OrdersNavigator";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const cartItemCount = useSelector((state) => state.cartReducer.cartItemCount);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      >
        <Tab.Screen
          name="ShopStack"
          component={ShopNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={focused ? colors.main : colors.gray}
              />
            ),
          }}
        />
        <Tab.Screen
          name="OrdersStack"
          component={OrdersNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="shopping-bag"
                size={24}
                color={focused ? colors.main : colors.gray}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CartStack"
          component={CartNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <MaterialCommunityIcons
                  name="cart"
                  size={24}
                  color={focused ? colors.main : colors.gray}
                />
                {cartItemCount > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{cartItemCount}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    left: 19,
    bottom: 10,
    backgroundColor: colors.main,
    borderRadius: 30,
    height: 22,
    width: 22,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightGreen,
    borderWidth: 2,
  },
  badgeText: {
    color: colors.lightGreen,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TabNavigator;
