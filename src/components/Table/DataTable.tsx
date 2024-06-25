import React from "react";
import "./DataTable.css";
import { Table } from "@mantine/core";
import {
  normalizationOfNullValues,
  dataAggregationOne,
  dataAggregationTwo,
  CropData,
} from "../Utilities/DataAnalysis";
import dataSet from "../../assets/Manufac _ India Agro Dataset.json";

const cropData: CropData[] = normalizationOfNullValues(dataSet);
const yearlyProductionStats = dataAggregationOne(cropData);
const cropStats = dataAggregationTwo(cropData);

console.log("Crop Data:", cropData);
console.log("Yearly Production Stats:", yearlyProductionStats);
console.log("Crop Stats:", cropStats);

const DataTable: React.FC = () => {
  return (
    <div>
      <h2>Crop Stats By Year (1950-2020)</h2>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {yearlyProductionStats.map((stat) => (
            <tr key={stat.year}>
              <td>{stat.year}</td>
              <td>{stat.maxProductionCrop}</td>
              <td>{stat.minProductionCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Crop Stats By Crop Name (1950-2020)</h2>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield</th>
            <th>Average Cultivation Area</th>
          </tr>
        </thead>
        <tbody>
          {cropStats.map((stat) => (
            <tr key={stat.crop}>
              <td>{stat.crop}</td>
              <td>{stat.averageYield}</td>
              <td>{stat.averageArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
