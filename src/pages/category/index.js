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
import { fetchDataCategories, fetchDataUsers } from "../../services/fetchData";
import { useAuth } from "../../services/context/auth";

import  { destroyDataCategory } from "../../services/destroyData";

import {
  ArrowDownLeftIcon,
  ArrowRightCircleIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { postDataCategory } from "../../services/postData";
import AddDataUsers from "./add-data";
import DestroyData from "./destroy-data";

const TABLE_HEAD = ["No", "Nama Category", "Action"];

const AddCategory = () => {
  const { cookies } = useAuth();
  const [refresh, setRefresh] = useState(false);

  const [dataCategories, setDataCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [active, setActive] = useState(1);
  const [addDataModal, setAddDataModal] = useState(false);
  const [showNotification, setShowNotification] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [destroyDataModal, setDestroyDataModal] = useState(false);


  const indexOfLastData = page;
  const indexOfFirstData = indexOfLastData - 10;
  const currentData = dataCategories.slice(indexOfFirstData, indexOfLastData);

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
    fetchDataCategories({ cookies }).then((data) => {
      setDataCategories(data);
      setIsLoading(false);
    });
  }, [refresh]);

  const handleAddOpen = () => {
    setAddDataModal(!addDataModal);
  };

  const handleDestroyDataModal = (data) => {
    setSelectedCategory(data);
    setDestroyDataModal(!destroyDataModal);
  };

  const handleAddSubmit = (formData) => {
    const options = { cookies, formData };
    setShowNotification("sending data...");
    postDataCategory(options)
      .then((newBook) => {
        setShowNotification("Data has been added");
        setRefresh(!refresh);
        // setDataCategories((prevData) => [newBook, ...prevData]);
        setAddDataModal(false);
      })
      .catch((error) => {
        setShowNotification("Failed to add data");
      });
  };

  const handleDestroy = (formData) => {
    const category_uuid = formData.get("uuid");
    const options = { cookies, category_uuid };
    destroyDataCategory(options)
      .then(() => {
        setShowNotification("Data user berhasil dihapus");
        setRefresh(!refresh);
      })
      .catch((error) => {
        setShowNotification("Failed to delete data");
        console.error(error);
      });
  }

  return (
    <AdminLayout>
      <div className="flex md:flex-col lg:flex-row mb-2">
        <Typography color="gray" variant="h4">
          List Data Category
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
            <span>List Data Category</span>
          </a>
        </Breadcrumbs>
      </div>
      {showNotification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {/* <strong className="font-bold"></strong> */}
          <span className="block sm:inline">{showNotification}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setShowNotification("")}
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.95 5.05a.75.75 0 010 1.06l-4.89 4.89 4.89 4.89a.75.75 0 11-1.06 1.06l-4.89-4.89-4.89 4.89a.75.75 0 01-1.06-1.06l4.89-4.89-4.89-4.89a.75.75 0 011.06-1.06l4.89 4.89 4.89-4.89a.75.75 0 011.06 0z"
              />
            </svg>
          </span>
        </div>
      )}
      <AddDataUsers
        open={addDataModal}
        handleSubmit={handleAddSubmit}
        handleOpen={handleAddOpen}
      />
      <DestroyData 
        open={destroyDataModal}
        handleOpen={handleDestroyDataModal}
        handleSubmit={handleDestroy}
        data={selectedCategory}
      />
      <Card color="white" className="p-4 flex">
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
                    currentData.map((data, index) => (
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
                            {data.name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Tooltip content="Edit Data">
                              <IconButton
                                variant="filled"
                                size="md"
                                color="red"
                                onClick={() => handleDestroyDataModal(data)}
                              >
                                <TrashIcon
                                  className="h-6 w-6"
                                  color="white"
                                />
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
                {dataCategories.length}
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
export default AddCategory;
