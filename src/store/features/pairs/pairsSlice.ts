import { createAppSlice } from "@/store/createAppSlice";
import type { AppThunk } from "@/store/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JsonObject } from "type-fest";
import { fetchPairs, IPair } from "./pairsAPI";
import { it } from "node:test";

export interface AgentsSliceState {
    isSuccess : boolean;
    pairs  : IPair[];
    selectedIndex : string;
    status    : "idle" | "loading" | "failed";
    msg       : string;
    total_count  : number;
}

const initialState: AgentsSliceState = {
    isSuccess : false,
    pairs    : [],
    status    : "idle",
    msg       :"",
    selectedIndex : "-1",
    total_count: 0
};

export const pairsSlice = createAppSlice({
  name: "pairs",
  
  initialState,
  
  reducers: (create) => ({
    getPairs: create.asyncThunk(
      async ({pageNumber, perPage}:{pageNumber:number, perPage:number}) => {
        const response = await fetchPairs({pageNumber, perPage});
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          if(action.payload.isSuccess) {
              let tmp_pairs = [];
              JSON.parse(action.payload.data).pairs.map((item, index) => {
                tmp_pairs.push({
                  token1_address: item.token1_address, token2_address: item.token2_address, pair_address: item.pair_address, 
                  bonding_curve_percentage: item.bonding_curve_percentage, 
                  pair_type: item.pair_type, bonded_at: item.bonded_at,  created_at: item.created_at
                });
              });
              state.pairs = tmp_pairs;
              state.total_count = JSON.parse(action.payload.data).total_count;
          }else{
              state.msg = action.payload.data;
          }
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    setSelectedPair: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.selectedIndex = action.payload;
      },
    ),
  }),
  
  selectors: {
    selectPairs : (pairs) => pairs.pairs,
    selectMsg      : (pairs) => pairs.msg,
    selectIsSuccess: (pairs) => pairs.isSuccess,
    selectStatus   : (pairs) => pairs.status,
    selectPair  : (pairs) => pairs.selectedIndex,
    selectTotalCount  : (pairs) => pairs.total_count,
  },
});

// Action creators are generated for each case reducer function.
export const { getPairs, setSelectedPair } =
  pairsSlice.actions;
 
// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPairs ,selectPair, selectMsg, selectIsSuccess, selectStatus, selectTotalCount } = pairsSlice.selectors;