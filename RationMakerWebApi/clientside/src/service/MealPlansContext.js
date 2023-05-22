// @ts-nocheck
import { useContext, createContext, useReducer, useEffect } from "react";
import useAuth from "./useAuth";
import { useApiCallOnMount } from "./useApiCallOnMount";
import { getPlans } from "./ApiCalls";
import { Outlet } from "react-router-dom";
import ApiStateHandler from "./ApiStateHandler";
import { submitForm } from "../components/modals/ModalDelete";

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

  // async function refresh() {
  //   try {
  //     const response = await submitForm(getPlans, userContext.auth.email);
  //     dispatch({ type: "SET_MEALPLANS", initialPlans: mealPlans });
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
      return {
        ...state,
        mealPlans: [...state.mealPlans, action.item],
      };
    }
    case "UPDATE_MEALPLAN": {
      return {
        ...state,
        mealPlans: state.mealPlans.map((mealPlan) => {
          if (mealPlan.id === action.item.id) {
            return { ...mealPlan, mealPlan: action.item };
          }
          return mealPlan;
        }),
      };
    }
    case "DELETE_MEALPLAN": {
      return {
        ...state,
        mealPlans: state.mealPlans.filter(
          (mealPlan) => mealPlan.id !== action.id
        ),
      };
    }
    case "ADD_MEALTIME": {
      return {
        ...state,
        mealPlans: state.mealPlans.map((mealPlan) => {
          if (mealPlan.id.toString() === action.dailyMealPlanId) {
            console.log("here");
            return {
              ...mealPlan,
              mealTimes: [...mealPlan.mealTimes, action.mealTime],
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
          if (mealPlan.id === action.item.dailyMealPlanId) {
            return {
              ...mealPlan,
              mealTimes: mealPlan.mealTimes.map((mealTime) => {
                if (mealTime.id === action.item.id) {
                  return {
                    ...mealTime,
                    mealTime: action.time,
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
