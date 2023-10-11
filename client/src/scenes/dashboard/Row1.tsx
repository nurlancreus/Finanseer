import { useMemo } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardBox } from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";

import { useGetKpisQuery } from "@/state/api";

export default function Row1() {
  const { palette } = useTheme();
  const { data: kpisData, isLoading } = useGetKpisQuery();

  const revenue = useMemo(() => {
    return (
      kpisData &&
      kpisData[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [kpisData]);

  const revenueExpenses = useMemo(() => {
    return (
      kpisData &&
      kpisData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [kpisData]);

  const revenueProfit = useMemo(() => {
    return (
      kpisData &&
      kpisData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: +(revenue - expenses).toFixed(2),
        };
      })
    );
  }, [kpisData]);

  return (
    <>
      {/* Revenue and Expenses */}
      <DashboardBox gridArea="a">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader
              title="Revenue and Expenses"
              subTitle="top line represents revenue, bottom line represents expenses"
              sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={revenueExpenses}
                margin={{
                  top: 15,
                  right: 25,
                  left: -10,
                  bottom: 60,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={palette.primary[300]}
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor={palette.primary[300]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorExpenses"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={palette.primary[300]}
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor={palette.primary[300]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ strokeWidth: "0" }}
                  style={{ fontSize: "10px" }}
                  domain={[8000, 23000]}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  dot={true}
                  stroke={palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  dot={true}
                  stroke={palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardBox>

      {/* Profit and Revenue */}
      <DashboardBox gridArea="b">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader
              title="Profit and Revenue"
              subTitle="top line represents revenue, bottom line represents expenses"
              sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={400}
                data={revenueProfit}
                margin={{
                  top: 20,
                  right: 0,
                  left: -10,
                  bottom: 55,
                }}
              >
                <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  height={20}
                  wrapperStyle={{
                    margin: "0 0 10px 0",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="profit"
                  dot={true}
                  stroke={palette.tertiary[500]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  dot={true}
                  stroke={palette.primary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardBox>

      {/* Revenue Month by Month */}
      <DashboardBox gridArea="c">
        {isLoading ? (
          <Box display="grid" height="100%" sx={{ placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <BoxHeader
              title="Revenue Month by Month"
              subTitle="graph representing the revenue month by month"
              sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={revenue}
                margin={{
                  top: 17,
                  right: 15,
                  left: -5,
                  bottom: 58,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={palette.primary[300]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={palette.primary[300]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardBox>
    </>
  );
}
