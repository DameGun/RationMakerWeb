// @ts-nocheck
import { useContext, createContext, useReducer, useEffect } from "react";
import useAuth from "../service/useAuth";
import { useApiCallOnMount } from "../service/useApiCallOnMount";
import { getPlans } from "../service/ApiCalls";
import { Outlet } from "react-router-dom";
import ApiStateHandler from "../service/ApiStateHandler";

const MealPlansContext = createContext(null);

const MealPlansDispatch = createContext(null);

export function MealPlansProvider() {
  const [state, dispatch] = useReducer(mealPlansReducer, {
    mealPlans: null,
  });

  const userContext = useAuth();
  const [loadingPlans, mealPlans, errorPlans] = useApiCallOnMount(
    getPlans,
    userContext.auth.email
  );

  useEffect(() => {
    dispatch({ type: "SET_MEALPLANS", initialPlans: mealPlans });
  }, [mealPlans]);

  return (
    <ApiStateHandler loading={loadingPlans} error={errorPlans}>
      <MealPlansContext.Provider value={state.mealPlans}>
        <MealPlansDispatch.Provider value={dispatch}>
          <Outlet />
        </MealPlansDispatch.Provider>
      </MealPlansContext.Provider>
    </ApiStateHandler>
  );
}

export function useMealPlans() {
  return useContext(MealPlansContext);
}

export function useMealPlansDispatch() {
  return useContext(MealPlansDispatch);
}

function mealPlansReducer(state, action) {
  switch (action.type) {
    case "SET_MEALPLANS": {
      return {
        ...state,
        mealPlans: action.initialPlans,
      };
    }
    case "ADD_MEALPLAN": {
      const existPlan = state.mealPlans.find((x) => x.id === action.payload.id);
      if (existPlan) {
        return { ...state };
      }
      return {
        ...state,
        mealPlans: [...state.mealPlans, action.payload],
      };
    }
    case "UPDATE_MEALPLAN": {
      return {
        ...state,
        mealPlans: state.mealPlans.map((mealPlan) => {
          if (mealPlan.id === action.payload.id) {
            return { ...mealPlan, mealPlan: action.payload };
          }
          return mealPlan;
        }),
      };
    }
    case "DELETE_MEALPLAN": {
      return {
        ...state,
        mealPlans: state.mealPlans.filter(
          (mealPlan) => mealPlan.id !== action.payload.id
        ),
      };
    }
    case "ADD_MEALTIME": {
      return {
        ...state,
        mealPlans: state.mealPlans.map((mealPlan) => {
          if (mealPlan.id === action.payload.dailyMealPlanId) {
            return {
              ...mealPlan,
              mealTimes: [...mealPlan.mealTimes, action.payload.mealTime],
            };
          }
          return mealPlan;
        }),
      };
    }
    case "UPDATE_MEALTIME": {
      return {
        ...state,
        mealPlans: state.mealPlans.map((mealPlan) => {
          if (mealPlan.id === action.payload.dailyMealPlanId) {
            return {
              ...mealPlan,
              mealTimes: mealPlan.mealTimes.map((mealTime) => {
                if (mealTime.id === action.payload.id) {
                  return {
                    ...mealTime,
                    name: action.payload.name,
                  };
                }
                return mealTime;
              }),
            };
          }
          return mealPlan;
        }),
      };
    }
    case "REMOVE_PRODUCT": {
      return {
        ...state,
        mealPlans: state.mealPlans.map((mealPlan) => {
          if (mealPlan.id === action.payload.dailyMealPlanId) {
            return {
              ...mealPlan,
              mealTimes: mealPlan.mealTimes.map((mealTime) => {
                if (mealTime.id === action.payload.id) {
                  return {
                    ...mealTime,
                    meal: action.payload.meal,
                  };
                }
                return mealTime;
              }),
            };
          }
          return mealPlan;
        }),
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
