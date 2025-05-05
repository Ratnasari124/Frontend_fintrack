import response, { TransaksiData } from "utils/Admin/transaksi/transaksiData";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@roketid/windmill-react-ui";
import React, { useState, useEffect } from "react";
import { EditIcon, TrashIcon } from "icons";


function TabelTransaksi() {
  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // setup data for every table
  const [transaksiData, setDataTable] = useState<TransaksiData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable2(p: number) {
    setPageTable(p);
  }
  
  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>NO</TableCell>
            <TableCell>KATEGORI</TableCell>
            <TableCell>JUMLAH</TableCell>
            <TableCell>Tanggal</TableCell>
            <TableCell>Aksi</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {transaksiData.map((item, i) => (
            <TableRow
              key={i}
              className={
                item.category.toLowerCase() === "reservasi"
                  ? "bg-green-100"
                  : "bg-red-100"
              }
            >
              <TableCell>
                <span className="text-sm">{i + 1}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.category}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">Rp {item.amount}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {new Date(item.transactionDate).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button layout="link" size="small" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="small" aria-label="Delete">
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onChange={onPageChangeTable2}
          label="Table navigation"
        />
      </TableFooter>
    </TableContainer>
  );
}

export default TabelTransaksi;
