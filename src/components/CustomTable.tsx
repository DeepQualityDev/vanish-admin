'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {IPair} from "@/store/features/pairs/pairsAPI";
import {
  getPairs,
  selectPairs
} from "@/store/features/pairs/pairsSlice";
import { it } from 'node:test';

export interface Column {
  id: 'token1_address' | 'token2_address' | 'pair_address' | 'bonding_curve_percentage' | 'bonded_at' | 'created_at';
  label: string;
  minWidth?: number;
  align?: 'right';
}

function createData(
  token1_address: string,
  token2_address: string,
  pair_address: string,
  bonding_curve_percentage: number,
  bonded_at: string,
  created_at: string,
): IPair {
  return { token1_address, token2_address, pair_address, bonding_curve_percentage, bonded_at, created_at };
}

const rows = [];

export function CustomTable ({type, columns}: {type: string, columns:Column[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(getPairs({ type: "pair"}));
  }, []);

  const pairs : IPair[] = useAppSelector(selectPairs);

  rows.length = 0;
  pairs.map((item: IPair, index: number) => {
    rows.push(createData(item.token1_address, item.token2_address, item.pair_address, item.bonding_curve_percentage, item.bonded_at, item.created_at))
  });


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight:  'fit-content'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="no" align="right">
                No
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key="no" align="right">
                      {index + 1}
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
