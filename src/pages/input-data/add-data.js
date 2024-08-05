import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import React, { useState } from "react";

const AddDataUsers = ({ open, handleOpen, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nisn: "",
    class: "",
    description: "",
    avatar: "",
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
      avatar: "",
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
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              onChange={handleChange}
              value={formData.password}
            />
            <IconButton
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              variant="text"
              size="sm"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </IconButton>
          </div>
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
