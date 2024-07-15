import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export function DetailPage({ open, handleOpen, data }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography color="blueGray" size="xl">
            Detail Data Buku
            {console.log(data)}
          </Typography>
        </DialogHeader>
        <DialogBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-flow-row">
            <div className="grid grid-cols-2 ml-7">
              <Typography color="blueGray" size="lg" className="">
                Judul Buku
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.title}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Deskripsi Buku
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.description}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Penulis Buku
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.author}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Penerbit Buku
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.publisher}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Tahun Terbit
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.year}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Total Halaman Buku
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.pages}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Kategori Buku
              </Typography>
              <Typography color="blueGray" size="sm">
                {/* {console.log(data?.categories[0].name)}
                {data?.categories[0].name} */}
                {data?.categories?.map((category) => (
                  <span key={category.uuid}>{category.name}, </span>
                )) || []}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Thumbnail Buku
              </Typography>
              <img src={data?.image} alt="thumbnail" />
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Sumber Buku
              </Typography>
              <a
                className="btn btn-success "
                href={data?.filepdf}
                target="_blank"
              >
                Lihat PDF
              </a>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Status
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.availability === 1 ? "Tersedia" : "Tidak Tersedia"}
              </Typography>
            </div>
            <div className="grid grid-cols-2 justify-stretch ml-7">
              <Typography color="blueGray" size="lg" className="">
                Total di dibaca hingga saat ini
              </Typography>
              <Typography color="blueGray" size="sm">
                {data?.loan_count}
              </Typography>
            </div>
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
        </DialogFooter>
      </Dialog>
    </>
  );
}
