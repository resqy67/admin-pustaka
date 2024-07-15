import {
  Typography,
  Breadcrumbs,
  Card,
  CardBody,
  Button,
  Input,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin-layout";
import { fetchDataLoans } from "../../services/fetchData";
import { useAuth } from "../../services/context/auth";
import {
  ArrowDownLeftIcon,
  ArrowRightCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
// import { postDataCategory } from "../../services/postData";
// import AddDataUsers from "./add-data";
import ReturnBook from "./return-book";
import { postReturnBook } from "../../services/postData";

const TABLE_HEAD = [
  "No",
  "Nama Peminjam",
  "NISN Peminjam",
  "Kelas Peminjam",
  "Buku Yang Dipinjam",
  "Tanggal Pinjam",
  "Terakhir Pinjam",
  "Sisa Waktu",
  "Action",
];

const Loans = () => {
  const { cookies } = useAuth();

  const [dataLoans, setDataLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [active, setActive] = useState(1);
  const [addDataModal, setAddDataModal] = useState(false);
  const [open, setOpen] = useState(false);

  const indexOfLastData = page;
  const indexOfFirstData = indexOfLastData - 10;
  const currentData = dataLoans.slice(indexOfFirstData, indexOfLastData);

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
    fetchDataLoans({ cookies, per_page: page, page: active }).then((data) => {
      setDataLoans(data); // Adjusted to access data array inside response object
      setIsLoading(false);
    });
  }, [page, active, cookies]);

  const handleOpen = (data) => {
    console.log(data);
    setSelectedLoan(data);
    setOpen(!open);
  };

  const handleAddOpen = () => {
    setAddDataModal(!addDataModal);
  };

  // const handleAddSubmit = (formData) => {
  //   const options = { cookies, formData };
  //   postReturnBook(options).then(() => {
  //     setAddDataModal(false);
  //   });
  // };
  const handleAddSubmit = async (formData) => {
    const options = { cookies, formData };
    await postReturnBook(options);
    setAddDataModal(false);
    fetchDataLoans({ cookies, per_page: page, page: active }).then((data) => {
      setDataLoans(data);
    });
  };

  const calculateDaysRemaining = (returnDate) => {
    const now = new Date();
    const returnD = new Date(returnDate);
    const timeDiff = returnD.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <AdminLayout>
      <div className="flex md:flex-col lg:flex-row mb-2">
        <Typography color="gray" variant="h4">
          List Data Loans
        </Typography>
        <Breadcrumbs className="ml-2">
          <a href="/dashboard" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="/add-category" className="opacity-60">
            <span>List Data Loans</span>
          </a>
        </Breadcrumbs>
      </div>
      {/* <AddDataUsers
        open={addDataModal}
        handleSubmit={handleAddSubmit}
        handleOpen={handleAddOpen}
      /> */}
      <ReturnBook
        open={open}
        handleOpen={handleOpen}
        data={selectedLoan}
        handleSubmit={handleAddSubmit}
      />
      <Card color="white" className="p-4 flex">
        <CardBody>
          <div className="flex justify-between mb-4">
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
                  {isLoading ? (
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
                    currentData.map((data, index) => {
                      const daysDiff = calculateDaysRemaining(data.return_date);
                      return (
                        <tr key={data.id} className="even:bg-blue-gray-50/50">
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
                              {data.user?.name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.user?.nisn}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.user?.class}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.book?.title}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.loan_date}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.return_date}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {daysDiff} Hari
                            </Typography>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Tooltip content="Kembalikan Peminjaman">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleOpen(data)}
                                >
                                  <PencilIcon
                                    className="h-4 w-4"
                                    color="gray"
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </Card>
            <div className="mt-4 flex justify-between items-center">
              <Typography color="gray">
                Showing {indexOfFirstData + 1} to {indexOfLastData} of{" "}
                {dataLoans.length}
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
                  Page <strong className="text-blue-gray-900">{active}</strong>{" "}
                  of{" "}
                  <strong className="text-blue-gray-900">
                    {Math.ceil(dataLoans.length / 10)}
                  </strong>
                </Typography>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={next}
                  disabled={active === Math.ceil(dataLoans.length / 10)}
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

export default Loans;
