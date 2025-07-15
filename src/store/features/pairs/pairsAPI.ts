import { JsonObject } from "type-fest";

export interface IPair {
  token1_address: string;
  token2_address: string;
  pair_address: string;
  bonding_curve_percentage: number;
  pair_type: number;
  bonded_at: string;
  created_at: string;
}

export const fetchPairs = async ({pageNumber, perPage}:{pageNumber:number, perPage:number}) => {
  try {
    const response = await fetch("/api/pairs/get", {
      method: "POST",
      body: JSON.stringify({ page_number: pageNumber, per_page: perPage }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return {isSuccess:true, data}
    } else {
      const data = await response.json();
      return {isSuccess:false, data}      
    }
  } catch (error) {
    return {isSuccess:false, data:error.message}      
  }
};
