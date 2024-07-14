import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Select,
} from "@material-tailwind/react";
import React, { useState } from "react";

const AddDataModal = ({ open, handleOpen, handleSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    publisher: "",
    isbn: "",
    year: "",
    pages: "",
    image: null,
    filepdf: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const onSubmit = () => {
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    handleSubmit(formDataToSubmit);
    setFormData({
      title: "",
      description: "",
      author: "",
      publisher: "",
      isbn: "",
      year: "",
      pages: "",
      image: null,
      filepdf: null,
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Tambah Data Buku</DialogHeader>
      <DialogBody divider>
        <div className="grid grid-cols-1 gap-4">
          <Input
            name="title"
            label="Judul Buku"
            onChange={handleChange}
            value={formData.title}
          />
          <Input
            name="description"
            label="Deskripsi Buku"
            onChange={handleChange}
            value={formData.description}
          />
          <Input
            name="author"
            label="Penulis"
            onChange={handleChange}
            value={formData.author}
          />
          <Input
            name="publisher"
            label="Penerbit"
            onChange={handleChange}
            value={formData.publisher}
          />
          <Input
            name="isbn"
            label="ISBN"
            onChange={handleChange}
            value={formData.isbn}
          />
          <Input
            name="year"
            label="Tahun Terbit"
            onChange={handleChange}
            value={formData.year}
          />
          <Input
            name="pages"
            label="Total Halaman"
            onChange={handleChange}
            value={formData.pages}
          />
          <Input
            type="file"
            name="image"
            label="Gambar"
            onChange={handleChange}
          />
          <Input
            type="file"
            name="filepdf"
            label="File PDF"
            onChange={handleChange}
          />
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

export default AddDataModal;
