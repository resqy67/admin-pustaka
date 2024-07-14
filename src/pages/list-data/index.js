import {
  Card,
  CardBody,
  Typography,
  Breadcrumbs,
  Select,
  Option,
  Input,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/admin-layout";
import { fetchDataBooks, fetchDataDetailBook } from "../../services/fetchData";
import { postDataBooks } from "../../services/postData";
import { useAuth } from "../../services/context/auth";
import {
  ArrowDownLeftIcon,
  ArrowRightCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { DetailPage } from "./detail-page";
import AddDataModal from "./add-data";

const TABLE_HEAD = [
  "No",
  "Judul Buku",
  "Penulis",
  "Penerbit",
  "Tahun Terbit",
  "Ketersediaan",
  "Total Pembaca",
  "Action",
];

const ListData = () => {
  const { cookies } = useAuth();
  const [dataBooks, setDataBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const [addDataModal, setAddDataModal] = useState(false);

  const indexOfLastData = page;
  const indexOfFirstData = indexOfLastData - 10;
  const currentData = dataBooks.slice(indexOfFirstData, indexOfLastData);

  const next = () => {
    if (active === 10) return;
    setPage((prev) => prev + 10);
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setPage((prev) => prev - 10);
    setActive(active - 1);
  };

  useEffect(() => {
    const options = { cookies, per_page: page, page: active };
    fetchDataBooks(options).then((data) => {
      setDataBooks(data);
      setLoading(false);
    });
  }, [page, active]);

  const handleOpen = (data) => {
    setSelectedBook(data);
    setOpen(!open);
  };

  const handleAddOpen = () => {
    setAddDataModal(!addDataModal);
  };

  const handleAddSubmit = (formData) => {
    const options = { cookies, formData };
    postDataBooks(options).then((newBook) => {
      setDataBooks((prevData) => [newBook, ...prevData]);
      setAddDataModal(false);
    });
  };

  return (
    <AdminLayout>
      <div className="flex items-center mb-4">
        <Typography color="gray" variant="h4">
          List Data Buku
        </Typography>
        <Breadcrumbs className="ml-2">
          <a href="#" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="#" className="opacity-60">
            <span>List Data Peraturan</span>
          </a>
        </Breadcrumbs>
      </div>
      <DetailPage open={open} handleOpen={handleOpen} data={selectedBook} />
      <AddDataModal
        open={addDataModal}
        handleOpen={handleAddOpen}
        handleSubmit={handleAddSubmit}
      />
      <Card color="white" className="p-4 flex flex-col">
        <CardBody>
          <div className="flex justify-between mb-4">
            <div>
              <Button
                color="blue"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                onClick={handleAddOpen}
              >
                Tambah Data
                {/* <Typography color="white">Tambah Data</Typography> */}
              </Button>
            </div>
            <div className="w-96">
              <Input
                label="Cari Data ..."
                icon={<i className="fas fa-search" />}
              />
            </div>
          </div>
          <div className="mt-4">
            <Card className="overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Loading...
                        </Typography>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((data, index) => (
                      <tr key={data.uuid} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.title}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.author}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.publisher}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.year}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.availability === 1
                              ? "Tersedia"
                              : "Tidak Tersedia"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.loan_count}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Tooltip content="Edit Data">
                              <IconButton
                                variant="text"
                                onClick={() => handleOpen(data)}
                              >
                                <PencilIcon className="h-4 w-4" color="gray" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>
            <div className="mt-4 flex justify-between items-center">
              <Typography color="gray">
                Showing {indexOfFirstData + 1} to {indexOfLastData} of{" "}
                {dataBooks.length}
              </Typography>
              <div className="flex items-center gap-4">
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={prev}
                  disabled={active === 1}
                >
                  <ArrowDownLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                  Page <strong className="text-gray-900">{active}</strong> of{" "}
                  <strong className="text-gray-900">10</strong>
                </Typography>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={next}
                  disabled={active === 10}
                >
                  <ArrowRightCircleIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </AdminLayout>
  );
};

export default ListData;
