import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetProfilePictureQuery } from "../services/shopServices";
import { useGetOrdersQuery } from "../services/shopServices";
import { setProfilePicture, setUser } from "../features/authSlice";
import { fetchSession } from "../db";
import { addOrder, setOrders } from "../features/orderSlice";

const MainNavigator = () => {
  const user = useSelector((state) => state.authReducer.user);
  const localId = useSelector((state) => state.authReducer.localId);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProfilePictureQuery(localId);
  // const {
  //   data: ordersData,
  //   isLoading: ordersLoading,
  //   error: ordersError,
  // } = useGetOrdersQuery();

  useEffect(() => {
    if (data) {
      dispatch(setProfilePicture(data.image));
    }
    // if (ordersData) {
    //   dispatch(addOrder(ordersData));
    // }
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        const session = await fetchSession();
        if (session?.rows.length) {
          console.log("Se encontraron datos");
          const user = session.rows._array[0];
          dispatch(setUser(user));
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario: ", error);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {user && !isLoading ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
