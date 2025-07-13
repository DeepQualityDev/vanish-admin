import { CustomTable } from "@/components/CustomTable";
import * as React from 'react';

interface Column {
  id: 'token1_address' | 'token2_address' | 'pair_address' | 'bonding_curve_percentage' | 'bonded_at' | 'created_at';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'token1_address', label: 'TOKEN1_ADDRESS', minWidth: 120 },
  {
    id: 'token2_address',
    label: 'TOKEN2_ADDRESS',
    minWidth: 120,
  },
  {
    id: 'pair_address',
    label: 'PAIRS_ADDRESS',
    minWidth: 120,
  },
  {
    id: 'bonding_curve_percentage',
    label: 'Bonding_Curve_Percentage',
    minWidth: 70,
  },
  {
    id: 'bonded_at',
    label: 'BONDED_AT',
    minWidth: 150,
  },
  {
    id: 'created_at',
    label: 'CREATE_AT',
    minWidth: 150,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <CustomTable type={"pairs"} columns={columns} />
    </main>
  );
}
