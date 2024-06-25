import React from "react";
import { MantineProvider } from "@mantine/core";
import DataTable from "./components/Table/DataTable";

const App: React.FC = () => {
  return (
    // Content wrapped with Mantime Provider to use the table from the library
    <MantineProvider>
      <div>
        <h1>Indian Agriculture Analytics</h1>
        <DataTable />
      </div>
    </MantineProvider>
  );
};

export default App;
