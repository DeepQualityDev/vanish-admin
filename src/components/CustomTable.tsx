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
import CircularProgress from "@mui/material/CircularProgress";
import {
  getPairs,
  selectPairs,
  selectStatus,
  selectTotalCount
} from "@/store/features/pairs/pairsSlice";

export interface Column {
  id: 'token1_address' | 'token2_address' | 'pair_address' | 'bonding_curve_percentage' | 'pair_type' | 'bonded_at' | 'created_at';
  label: string;
  minWidth?: number;
  align?: 'right';
}

function createData(
  token1_address: string,
  token2_address: string,
  pair_address: string,
  bonding_curve_percentage: number,
  pair_type: number,
  bonded_at: string,
  created_at: string,
): IPair {
  return { token1_address, token2_address, pair_address, bonding_curve_percentage, pair_type, bonded_at, created_at };
}

const rows = [];

export function CustomTable ({type, columns}: {type: string, columns:Column[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(getPairs({ pageNumber: page, perPage: rowsPerPage}));
  }, []);

  const pairs : IPair[] = useAppSelector(selectPairs);
  const totalCount : number = useAppSelector(selectTotalCount);
  const status = useAppSelector(selectStatus);

  rows.length = 0;
  pairs.map((item: IPair, index: number) => {
    rows.push(createData(item.token1_address, item.token2_address, item.pair_address, item.bonding_curve_percentage, item.pair_type, item.bonded_at, item.created_at))
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch(getPairs({ pageNumber: newPage, perPage: rowsPerPage}));
    localStorage.setItem("page_number", newPage.toString());
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getPairs({ pageNumber: 0, perPage: +event.target.value}));
    setRowsPerPage(+event.target.value);
    setPage(0);
    localStorage.setItem("per_page", (+event.target.value).toString());
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          {status == "loading"?
            <div className='flex justify-center items-center min-h-screen'><CircularProgress size={90} /></div>
            :
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
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell key="no" align="right">
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (column.id == 'bonding_curve_percentage' && value == -1) {
                            value = "NULL";
                          }
                          if (column.id == 'pair_type') {
                            switch (value) {
                              case 3:
                                value = "Pumpfun"
                                break;
                              case 8:
                                value = "Launchlap"
                              case 10:
                                value = "Moonit"
                              default:
                                break;
                            }
                          }
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
          }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
