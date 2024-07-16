import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { fetchDataCategories } from "../../services/fetchData";

const AddBookCategory = ({
  open,
  handleOpen,
  handleSubmit,
  data,
  category,
}) => {
  const [formData, setFormData] = useState({
    book_uuid: data.uuid,
    category_uuid: "",
  });

  useEffect(() => {
    setFormData({
      book_uuid: data.uuid,
      category_uuid: "",
    });
  }, [data.uuid]);

  const handleChange = (value, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Mencegah reload halaman
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      await handleSubmit(formDataToSubmit);
      handleOpen(false); // Menutup modal setelah submit berhasil
      // Reset formData ke nilai awal jika diperlukan
      setFormData({
        book_uuid: data.uuid,
        category_uuid: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Tampilkan pesan error ke pengguna
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Tambah Kategori Buku</DialogHeader>
      <DialogBody divider>
        <div className="grid grid-cols-1 gap-4">
          <Input disabled name="name" label="Judul Buku" value={data.title} />
          <Select
            label="Category"
            onChange={(value) => handleChange(value, "category_uuid")}
            value={formData.category_uuid}
          >
            {category.map((cat) => (
              <Option key={cat.uuid} value={cat.uuid}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onSubmit}>
          <span>Save</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddBookCategory;
