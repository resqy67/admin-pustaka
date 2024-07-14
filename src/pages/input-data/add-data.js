import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";

const AddDataUsers = ({ open, handleOpen, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nisn: "",
    class: "",
    description: "",
    avatar: null,
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
      name: "",
      email: "",
      password: "",
      nisn: "",
      class: "",
      description: "",
      avatar: null,
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Tambah Data Buku</DialogHeader>
      <DialogBody divider>
        <div className="grid grid-cols-1 gap-4">
          <Input
            name="name"
            label="Nama Lengkap"
            onChange={handleChange}
            value={formData.name}
          />
          <Input
            name="description"
            label="Cerita Singkat"
            onChange={handleChange}
            value={formData.description}
          />
          <Input
            name="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <Input
            name="password"
            label="password"
            onChange={handleChange}
            value={formData.password}
          />
          <Input
            name="nisn"
            label="NISN"
            onChange={handleChange}
            value={formData.nisn}
          />
          <Input
            name="class"
            label="Kelas Pengguna"
            onChange={handleChange}
            value={formData.class}
          />
          <Input
            type="file"
            name="avatar"
            label="Gambar"
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

export default AddDataUsers;
