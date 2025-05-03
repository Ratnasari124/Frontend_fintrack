import InfoCard from 'example/components/Cards/InfoCard'
import RoundIcon from 'example/components/RoundIcon'
import PageTitle from 'example/components/Typography/PageTitle';
import Layout from 'example/containers/Layout'
import { CartIcon, ChatIcon, EditIcon, MoneyIcon, PeopleIcon, TrashIcon } from 'icons';
import response, { ITableData } from "utils/demo/tableData";
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

function Transaksi() {
  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState<ITableData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable2(p: number) {
    setPageTable(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);
  return (
    <Layout>
      <PageTitle>Cards</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

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
            {dataTable.map((item, i) => (
              <TableRow
                key={i}
                className={
                  item.kategori.toLowerCase() === "reservasi"
                    ? "bg-green-100"
                    : "bg-red-100"
                }
              >
                <TableCell>
                  <span className="text-sm">{i + 1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.kategori}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Rp {item.amount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(item.date).toLocaleDateString()}
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
    </Layout>
  );
}

export default Transaksi