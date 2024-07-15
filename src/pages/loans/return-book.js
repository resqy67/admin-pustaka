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

const ReturnBook = ({ open, handleOpen, handleSubmit, data }) => {
  console.log(data);
  const [formData, setFormData] = useState({
    loan_uuid: data.uuid,
  });

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: files ? files[0] : value,
  //   });
  // };

  const onSubmit = () => {
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    handleSubmit(formDataToSubmit);
    setFormData({
      loan_uuid: data.uuid,
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Tambah Data Buku</DialogHeader>
      <DialogBody divider>
        <div className="grid grid-cols-1 gap-4">
          <Input
            disabled={true}
            name="name"
            label="Nama Pengguna"
            // onChange={handleChange}
            // value={data.user.name}
          />
          <Input
            disabled={true}
            name="name"
            label="Buku yang dipinjam"
            // onChange={handleChange}
            // value={data.book.title}
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

export default ReturnBook;
