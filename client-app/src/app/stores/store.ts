import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface store {
      activityStore :ActivityStore;
      commonStore: CommonStore;
}

export const store: store = {
      activityStore: new ActivityStore(), 
      commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
      return useContext(StoreContext)
}