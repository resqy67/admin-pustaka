import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";

const AddDataModal = ({ handleOpen, handleSubmit, open }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.author ||
      !formData.image ||
      !formData.filepdf ||
      !formData.publisher ||
      !formData.isbn ||
      !formData.year ||
      !formData.pages
    ) {
      setError("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      await handleSubmit(formDataToSubmit);
      handleOpen(); // Close modal on success
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      handleOpen={handleOpen}
      open={open}
      size="md"
      className="min-w-[300px] sm:min-w-[500px] md:min-w-[700px] lg:min-w-[900px] "
    >
      <form onSubmit={onSubmit}>
        <DialogHeader>Tambah Data Buku</DialogHeader>
        <DialogBody
          divider
          className="max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="grid grid-cols-1 gap-4">
            <Input
              name="title"
              label="Judul Buku"
              onChange={handleChange}
              value={formData.title}
              disabled={isSubmitting}
              required
            />
            <Textarea
              name="description"
              label="Deskripsi Buku"
              onChange={handleChange}
              value={formData.description}
              disabled={isSubmitting}
              required
            />
            <Input
              name="author"
              label="Penulis"
              onChange={handleChange}
              value={formData.author}
              disabled={isSubmitting}
              required
            />
            <Input
              name="publisher"
              label="Penerbit"
              onChange={handleChange}
              value={formData.publisher}
              disabled={isSubmitting}
              required
            />
            <Input
              name="isbn"
              label="ISBN"
              onChange={handleChange}
              value={formData.isbn}
              disabled={isSubmitting}
              required
            />
            <Input
              name="year"
              label="Tahun Terbit"
              onChange={handleChange}
              value={formData.year}
              disabled={isSubmitting}
              required
            />
            <Input
              name="pages"
              label="Total Halaman"
              onChange={handleChange}
              value={formData.pages}
              disabled={isSubmitting}
              required
            />
            <Input
              type="file"
              name="image"
              label="Gambar"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            <Input
              type="file"
              name="filepdf"
              label="File PDF"
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => handleOpen(false)}
            disabled={isSubmitting}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="green" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default AddDataModal;
