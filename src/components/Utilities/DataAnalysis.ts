// Utility File for all the helper and main functions for Data Analysis

// Crop Data Struct
interface CropData {
  year: number;
  crop: string;
  production: number;
  area: number;
}
// Function to adjust null/ empty values
const normalizationOfNullValues = (data: any[]): CropData[] => {
  return data.map((data) => {
    const year = parseInt(data.Year.match(/\d{4}/)[0], 10);
    return {
      year,
      crop: data["Crop Name"],
      production: parseFloat(data["Crop Production (UOM:t(Tonnes))"]) || 0,
      area: parseFloat(data["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
    };
  });
};

// Function to aggregate crop data with year based sequence
const dataAggregationOne = (data: CropData[]) => {
  const years = Array.from(new Set(data.map((d) => d.year)));
  return years.map((year) => {
    const cropsInYear = data.filter((d) => d.year === year);
    const maxProduction = Math.max(...cropsInYear.map((d) => d.production));
    const minProduction = Math.min(...cropsInYear.map((d) => d.production));
    return {
      year,
      maxProductionCrop:
        cropsInYear.find((d) => d.production === maxProduction)?.crop || "N/A",
      minProductionCrop:
        cropsInYear.find((d) => d.production === minProduction)?.crop || "N/A",
    };
  });
};

// Function to aggregate crop data based on a certain crop
const dataAggregationTwo = (data: CropData[]) => {
  const crops = Array.from(new Set(data.map((d) => d.crop)));
  return crops.map((crop) => {
    const cropsData = data.filter((d) => d.crop === crop);
    const totalYield = cropsData.reduce((sum, d) => sum + d.production, 0);
    const totalArea = cropsData.reduce((sum, d) => sum + d.area, 0);
    const count = cropsData.length;
    return {
      crop,
      averageYield: parseFloat((totalYield / count).toFixed(3)),
      averageArea: parseFloat((totalArea / count).toFixed(3)),
    };
  });
};

// Exporting the functions 
export { normalizationOfNullValues, dataAggregationOne, dataAggregationTwo };
export type { CropData };
