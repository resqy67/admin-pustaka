import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const DestroyData = ({ open, handleOpen, handleSubmit, data }) => {
  const [formData, setFormData] = useState({ id: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({ id: data.id });
    }
  }, [data]);

  const onSubmit = async () => {
    setLoading(true);
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      await handleSubmit(formDataToSubmit);
      handleOpen(false); // Close modal after successful submit
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally display error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Hapus Data Buku</DialogHeader>
      <DialogBody divider>
        <Typography color="red">
          Apakah Anda yakin ingin menghapus data ini?
        </Typography>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <Input disabled name="nama" label="Nama User" value={data.name} />
          <Input disabled name="email" label="Email User" value={data.email} />
          <Input disabled name="nisn" label="NISN" value={data.nisn} />

        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="green"
          onClick={() => handleOpen(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? <span>Loading...</span> : <span>Destroy</span>}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

DestroyData.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default DestroyData;
