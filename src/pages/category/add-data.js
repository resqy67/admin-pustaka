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
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Tambah Data Buku</DialogHeader>
      <DialogBody divider>
        <div className="grid grid-cols-1 gap-4">
          <Input
            name="name"
            label="Nama Kategory"
            onChange={handleChange}
            value={formData.name}
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
