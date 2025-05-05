
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";


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
import TabelTransaksi from "example/components/Admin/transaksi/tabelTransaksi";
import CardTransaksi from "example/components/Admin/transaksi/cardTransaksi";

function Transaksi() {

  const handleAddClick = () => {
    window.location.href = "/Admin/formTransaksi";
  };
  return (
    <Layout>
      <PageTitle>Transaksi</PageTitle>
      <CardTransaksi />
      <div className="flex justify-end">
        <Button onClick={handleAddClick}>Tambah</Button>
      </div>
      <TabelTransaksi />
    </Layout>
  );
}

export default Transaksi;
