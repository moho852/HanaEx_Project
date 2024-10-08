// // import React, { useState } from 'react';
// // import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

// // const data = [
// //   { name: 'Group A', value: 400 },
// //   { name: 'Group B', value: 300 },
// //   { name: 'Group C', value: 300 },
// //   { name: 'Group D', value: 200 },
// // ];

// // const renderActiveShape = (props) => {
// //   const RADIAN = Math.PI / 180;
// //   const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
// //   const sin = Math.sin(-RADIAN * midAngle);
// //   const cos = Math.cos(-RADIAN * midAngle);
// //   const sx = cx + (outerRadius + 10) * cos;
// //   const sy = cy + (outerRadius + 10) * sin;
// //   const mx = cx + (outerRadius + 30) * cos;
// //   const my = cy + (outerRadius + 30) * sin;
// //   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
// //   const ey = my;
// //   const textAnchor = cos >= 0 ? 'start' : 'end';

// //   return (
// //     <g>
// //       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
// //         {payload.name}
// //       </text>
// //       <Sector
// //         cx={cx}
// //         cy={cy}
// //         innerRadius={innerRadius}
// //         outerRadius={outerRadius}
// //         startAngle={startAngle}
// //         endAngle={endAngle}
// //         fill={fill}
// //       />
// //       <Sector
// //         cx={cx}
// //         cy={cy}
// //         startAngle={startAngle}
// //         endAngle={endAngle}
// //         innerRadius={outerRadius + 6}
// //         outerRadius={outerRadius + 10}
// //         fill={fill}
// //       />
// //       <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
// //       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
// //       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
// //       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
// //         {`(Rate ${(percent * 100).toFixed(2)}%)`}
// //       </text>
// //     </g>
// //   );
// // };

// // const Example = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);

// //   const onPieEnter = (_, index) => {
// //     setActiveIndex(index);
// //   };

// //   return (
// //     <PieChart width={400} height={400}>
// //       <Pie
// //         activeIndex={activeIndex}
// //         activeShape={renderActiveShape}
// //         data={data}
// //         cx="50%"
// //         cy="50%"
// //         innerRadius={60}
// //         outerRadius={80}
// //         fill="#8884d8"
// //         dataKey="value"
// //         onMouseEnter={onPieEnter}
// //       />
// //     </PieChart>
// //   );
// // };

// // export default Example;

// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

// const renderActiveShape = (props) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {payload.name}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#333"
//       >{`PV ${value}`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         fill="#999"
//       >
//         {`(Rate ${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// const Example = ({ accountsData }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (accountsData && accountsData.length > 0) {
//       // accountsData에서 usd, jpy, eur 데이터를 추출
//       const currenciesData = [
//         { name: "USD", value: parseFloat(accountsData[1].usd) * 1316.95, fill: '#FF8042' },
//         { name: "JPY", value: parseFloat(accountsData[1].jpy) * 900, fill: '#0088FE' },
//         { name: "EUR", value: parseFloat(accountsData[1].eur) * 1508, fill: '#00C49F' },
//       ];

//       // 값이 0이 아닌 항목만 필터링
//       const filteredData = currenciesData.filter(
//         (currency) => currency.value > 0
//       );
//       setData(filteredData);
//     }
//   }, [accountsData]);

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         activeIndex={activeIndex}
//         activeShape={renderActiveShape}
//         data={data}
//         cx="50%"
//         cy="50%"
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="value"
//         onMouseEnter={onPieEnter}
//       />
//     </PieChart>
//   );
// };

// export default Example;

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Example = ({ accountsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accountsData && accountsData.length > 0) {
      const currenciesData = [
        { name: "USD", value: parseFloat(accountsData[1].usd) * 1316.95, fill: '#FF8042' },
        { name: "JPY", value: parseFloat(accountsData[1].jpy) * 900, fill: '#0088FE' },
        { name: "EUR", value: parseFloat(accountsData[1].eur) * 1508, fill: '#00C49F' },
      ];

      const filteredData = currenciesData.filter(
        (currency) => currency.value > 0
      );
      setData(filteredData);
    }
  }, [accountsData]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};

export default Example;

