import React, { useState } from "react";
import {
  Input,
  Label,
  Select,
  Textarea,
  Button,
} from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import SectionTitle from "example/components/Typography/SectionTitle";
import Layout from "example/containers/Layout";
import { TransaksiData } from "utils/Admin/transaksi/transaksiData";

function TransactionForm() {
  const [formData, setFormData] = useState<Partial<TransaksiData>>({
    category: "",
    type: "",
    amount: "",
    transactionDate: "",
    description: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TransaksiData, string>>
  >({});

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) {
      error = "Field ini wajib diisi.";
    } else if (name === "amount" && Number(value) <= 0) {
      error = "Jumlah harus lebih dari 0.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    // Cek semua field wajib
    const requiredFields: (keyof TransaksiData)[] = [
      "category",
      "type",
      "amount",
      "transactionDate",
    ];
    const newErrors: Partial<Record<keyof TransaksiData, string>> = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Field ini wajib diisi.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    try {
      const response = await fetch("https://example.com/api/transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal mengirim data ke server.");

      const result = await response.json();
      console.log("Berhasil:", result);
      alert("Transaksi berhasil disimpan!");

      setFormData({
        category: "",
        type: "",
        amount: "",
        transactionDate: "",
        description: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi.");
    }
  };

  return (
    <Layout>
      <PageTitle>Tambah Transaksi</PageTitle>
      <SectionTitle>Form Transaksi</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Kategori */}
        <Label className="mt-4">
          <span>Kategori</span>
          <Select
            className="mt-1"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
          >
            <option value="">Pilih Kategori</option>
            <option value="Gaji">Gaji</option>
            <option value="Belanja">Belanja</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Hiburan">Hiburan</option>
            <option value="Lainnya">Lainnya</option>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">{errors.category}</p>
          )}
        </Label>

        {/* Jenis Transaksi */}
        <Label className="mt-4">
          <span>Jenis Transaksi</span>
          <Select
            className="mt-1"
            name="type"
            value={formData.type || ""}
            onChange={handleChange}
          >
            <option value="">Pilih Jenis</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-600 mt-1">{errors.type}</p>
          )}
        </Label>

        {/* Jumlah */}
        <Label className="mt-4">
          <span>Jumlah (Rp)</span>
          <Input
            className="mt-1"
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}
            placeholder="Masukkan jumlah"
          />
          {errors.amount && (
            <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
          )}
        </Label>

        {/* Tanggal */}
        <Label className="mt-4">
          <span>Tanggal</span>
          <Input
            className="mt-1"
            type="date"
            name="transactionDate"
            value={formData.transactionDate || ""}
            onChange={handleChange}
          />
          {errors.transactionDate && (
            <p className="text-sm text-red-600 mt-1">
              {errors.transactionDate}
            </p>
          )}
        </Label>

        {/* Keterangan */}
        <Label className="mt-4">
          <span>Keterangan</span>
          <Textarea
            className="mt-1"
            rows={4}
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Masukkan keterangan transaksi"
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description}</p>
          )}
        </Label>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-end space-x-4">
          <Button layout="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </div>
    </Layout>
  );
}

export default TransactionForm;
