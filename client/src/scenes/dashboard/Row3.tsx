import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Box, CircularProgress, LinearProgress, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";

import { DashboardBox } from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { FlexBetween } from "@/components/FlexBetween";

export default function Row3() {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpisData, isLoading: isLoadingKpis } = useGetKpisQuery();
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery();

  const isLoading = isLoadingKpis || isLoadingProducts || isLoadingTransactions;

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  const pieChartData = useMemo(() => {
    if (kpisData) {
      const totalExpenses = kpisData[0].totalExpenses;
      return Object.entries(kpisData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpisData]);

  return (
    <>
      <DashboardBox gridArea="g">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader
              title="List of Products"
              sideText={`${productsData?.length} products`}
            />
            <Box
              mt="0.5rem"
              p="0 0.5rem "
              height="75%"
              sx={{
                "& .MuiDataGrid-root": {
                  color: palette.grey[300],
                  border: "none",
                  overflowY: "hidden",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnSeperator": {
                  visibility: "hidden",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
              }}
            >
              <DataGrid
                columnHeaderHeight={25}
                rowHeight={35}
                hideFooter={true}
                columns={productColumns}
                rows={productsData || []}
              />
            </Box>
          </>
        )}
      </DashboardBox>
      <DashboardBox gridArea="h">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader
              title="List of Products"
              sideText={`${productsData?.length} products`}
            />
            <Box
              mt="1rem"
              p="0 .5rem "
              height="80%"
              sx={{
                "& .MuiDataGrid-root": {
                  color: palette.grey[300],
                  border: "none",
                  overflowY: "hidden",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnSeperator": {
                  visibility: "hidden",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
              }}
            >
              <DataGrid
                columnHeaderHeight={25}
                rowHeight={35}
                hideFooter={true}
                columns={transactionColumns}
                rows={transactionsData || []}
              />
            </Box>
          </>
        )}
      </DashboardBox>
      <DashboardBox gridArea="i">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
            <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
              {pieChartData?.map((data, i) => (
                <Box key={`${data[0].name}-${i}`}>
                  <PieChart width={110} height={100}>
                    <Tooltip />
                    <Pie
                      stroke="none"
                      data={data}
                      innerRadius={18}
                      outerRadius={35}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <Typography variant="h5">{data[0].name}</Typography>
                </Box>
              ))}
            </FlexBetween>
          </>
        )}
      </DashboardBox>
      <DashboardBox gridArea="j">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader
              title="Overall Summary and Explanation Data"
              sideText="+15%"
            />
            <Box mx="1rem">
              <LinearProgress
                variant="determinate"
                sx={{
                  backgroundColor: `${palette.primary[800]}`,
                  height: "15px",
                  borderRadius: "1rem",
                  margin: "1.25rem 0 0.75rem",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: " 1rem",
                    backgroundColor: `${palette.primary[600]}`,
                  },
                }}
                value={40}
              />
              <Typography variant="h6">
                Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem
                etiam ullamcorper odio sed. Ipsum non sed gravida etiam urna
                egestas molestie volutpat et. Malesuada quis pretium aliquet
                lacinia ornare sed. In volutpat nullam at est id cum pulvinar
                nunc.
              </Typography>
            </Box>
          </>
        )}
      </DashboardBox>
    </>
  );
}
