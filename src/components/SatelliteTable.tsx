import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";

interface Column {
  id: "name" | "nextpass" | "latitude" | "longitude" | "height" | "maxe";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 100 ,maxWidth:200},
  { id: "nextpass", label: "Next\u00a0Pass", minWidth: 50 ,maxWidth:100},
  {
    id: "latitude",
    label: "Latitude\u00a0(\u00b0)",
    minWidth: 50,
    maxWidth:100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "longitude",
    label: "Longitude\u00a0(\u00b0)",
    minWidth: 50,
    maxWidth:100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "height",
    label: "Height\u00a0(mi)",
    minWidth: 50,
    maxWidth:100,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "maxe",
    label: "Max\u00a0E\u00a0(mi)",
    minWidth: 50,
    maxWidth:100,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  nextpass: string;
  latitude: number;
  longitude: number;
  height: number;
  maxe: number;
}

function createData(
  name: string,
  nextpass: string,
  latitude: number,
  longitude: number,
  height: number,
  maxe: number,
): Data {
  return { name, nextpass, latitude, longitude, height, maxe };
}

const rows = [
  createData("ISS (Zarya)", "5 min", -134, 202, 256, 300),
  createData("ISS", "1456 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
  createData("ISS (Zarya)", "5 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
  createData("ISS", "5 min", -134, 202, 256, 300),
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="space-around" sx={{maxWidth:800}}>
      <Stack direction="column" spacing={1} justifyContent="center">
        <div>Select</div>
        <div>Add</div>
        <div>Delete</div>
      </Stack>

      <Paper sx={{ overflow: "hidden", width: "100%", minWidth: 600 }}>
        <TableContainer sx={{ maxHeight: "11rem" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.nextpass}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{ paddingTop: "4px", paddingBottom: "4px" }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
export default StickyHeadTable;