import React, { useEffect, useState } from "react";
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

type Props = {
  existingData: TransaksiData;
};

function TransactionEditForm({ existingData }: Props) {
  const [formData, setFormData] = useState<Partial<TransaksiData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(existingData);
  }, [existingData]);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) {
      error = `${name} wajib diisi.`;
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
    const requiredFields = ["category", "type", "amount", "transactionDate"];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (!value) {
        newErrors[field] = `${field} wajib diisi.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        `https://example.com/api/transaksi/${formData.transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui data.");
      }

      alert("Transaksi berhasil diperbarui!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengedit transaksi.");
    }
  };

  return (
    <Layout>
      <PageTitle>Edit Transaksi</PageTitle>
      <SectionTitle>Form Edit Transaksi</SectionTitle>

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
            <span className="text-sm text-red-500">{errors.category}</span>
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
            <span className="text-sm text-red-500">{errors.type}</span>
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
            <span className="text-sm text-red-500">{errors.amount}</span>
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
            <span className="text-sm text-red-500">
              {errors.transactionDate}
            </span>
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
            <span className="text-sm text-red-500">{errors.description}</span>
          )}
        </Label>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-end space-x-4">
          <Button layout="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Perbarui</Button>
        </div>
      </div>
    </Layout>
  );
}

export default TransactionEditForm;
