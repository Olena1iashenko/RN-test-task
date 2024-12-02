import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type RootParamList = {
  Auth: undefined; // No parameters for the Auth screen
  Main: undefined; // No parameters for the Main screen
  // Add other screens here if necessary
};
