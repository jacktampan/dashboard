import { Fragment, useState } from "react";
import axios from "axios";
import CheckboxGroup from "./CheckboxGroup";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    namaKost: "",
    ukuranKost: "",
    jumlahTotalKamar: "",
    jumlahKamarTersedia: "",
    hargaPerBulan: "",
    hargaPer3Bulan: "",
    hargaPer6Bulan: "",
    hargaPer12Bulan: "",
    alamat: "",
    kota: "",
    provinsi: "",
    fasilitasKamar: [],
    fasilitasBersama: [],
    peraturan: [],
    fotoKost: null,
    fotoLuarKamar: null,
    fotoDalamKamar: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (group, option) => {
    setFormData((prevData) => ({
      ...prevData,
      [group]: prevData[group].includes(option)
        ? prevData[group].filter((item) => item !== option)
        : [...prevData[group], option],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        !Array.isArray(formData[key]) &&
        key !== "fotoKost" &&
        key !== "fotoLuarKamar" &&
        key !== "fotoDalamKamar"
      ) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product created:", response.data);
      // Reset form
      setFormData({
        namaKost: "",
        ukuranKost: "",
        jumlahTotalKamar: "",
        jumlahKamarTersedia: "",
        hargaPerBulan: "",
        hargaPer3Bulan: "",
        hargaPer6Bulan: "",
        hargaPer12Bulan: "",
        alamat: "",
        kota: "",
        provinsi: "",
        fasilitasKamar: [],
        fasilitasBersama: [],
        peraturan: [],
        fotoKost: null,
        fotoLuarKamar: null,
        fotoDalamKamar: null,
      });
      setShowNotification(true);
    } catch (error) {
      console.error("There was an error creating the product!", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-900">Product Form</h1>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nama Kost:</label>
            <input
              type="text"
              name="namaKost"
              value={formData.namaKost}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.namaKost && (
              <p className="text-red-500">{errors.namaKost}</p>
            )}
          </div>
          <div>
            <label>Ukuran Kost:</label>
            <input
              type="text"
              name="ukuranKost"
              value={formData.ukuranKost}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.ukuranKost && (
              <p className="text-red-500">{errors.ukuranKost}</p>
            )}
          </div>
          <div>
            <label>Jumlah Total Kamar:</label>
            <input
              type="number"
              name="jumlahTotalKamar"
              value={formData.jumlahTotalKamar}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.jumlahTotalKamar && (
              <p className="text-red-500">{errors.jumlahTotalKamar}</p>
            )}
          </div>
          <div>
            <label>Jumlah Kamar Tersedia:</label>
            <input
              type="number"
              name="jumlahKamarTersedia"
              value={formData.jumlahKamarTersedia}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.jumlahKamarTersedia && (
              <p className="text-red-500">{errors.jumlahKamarTersedia}</p>
            )}
          </div>
          <div>
            <label>Harga Per Bulan:</label>
            <input
              type="number"
              name="hargaPerBulan"
              value={formData.hargaPerBulan}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.hargaPerBulan && (
              <p className="text-red-500">{errors.hargaPerBulan}</p>
            )}
          </div>
          <div>
            <label>Harga Per 3 Bulan:</label>
            <input
              type="number"
              name="hargaPer3Bulan"
              value={formData.hargaPer3Bulan}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.hargaPer3Bulan && (
              <p className="text-red-500">{errors.hargaPer3Bulan}</p>
            )}
          </div>
          <div>
            <label>Harga Per 6 Bulan:</label>
            <input
              type="number"
              name="hargaPer6Bulan"
              value={formData.hargaPer6Bulan}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.hargaPer6Bulan && (
              <p className="text-red-500">{errors.hargaPer6Bulan}</p>
            )}
          </div>
          <div>
            <label>Harga Per 12 Bulan:</label>
            <input
              type="number"
              name="hargaPer12Bulan"
              value={formData.hargaPer12Bulan}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.hargaPer12Bulan && (
              <p className="text-red-500">{errors.hargaPer12Bulan}</p>
            )}
          </div>
          <div>
            <label>Alamat:</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.alamat && <p className="text-red-500">{errors.alamat}</p>}
          </div>
          <div>
            <label>Kota:</label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.kota && <p className="text-red-500">{errors.kota}</p>}
          </div>
          <div>
            <label>Provinsi:</label>
            <input
              type="text"
              name="provinsi"
              value={formData.provinsi}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.provinsi && (
              <p className="text-red-500">{errors.provinsi}</p>
            )}
          </div>
          <CheckboxGroup
            title="Fasilitas Kamar"
            options={[
              "AC",
              "Kipas angin",
              "Lemari baju",
              "Meja",
              "Wastafel",
              "Kasur",
            ]}
            selectedOptions={formData.fasilitasKamar}
            handleChange={(option) =>
              handleCheckboxChange("fasilitasKamar", option)
            }
          />
          <CheckboxGroup
            title="Fasilitas Bersama"
            options={[
              "Wifi",
              "Keamanan (CCTV, satpam)",
              "Dapur bersama",
              "Ruang tamu atau ruang komunal",
              "Taman atau area hijau",
              "Musholla",
              "Parkir mobil",
            ]}
            selectedOptions={formData.fasilitasBersama}
            handleChange={(option) =>
              handleCheckboxChange("fasilitasBersama", option)
            }
          />
          <CheckboxGroup
            title="Peraturan Kost"
            options={[
              "Tidak boleh bawa hewan peliharaan",
              "Tidak boleh merokok di kamar",
              "Dilarang menerima tamu menginap",
              "Tamu hanya boleh berkunjung pada jam tertentu",
              "Denda kerusakan barang kost",
              "Wajib sertakan KTP saat pengajuan sewa",
            ]}
            selectedOptions={formData.peraturan}
            handleChange={(option) => handleCheckboxChange("peraturan", option)}
          />
          <div>
            <label>Foto Kost:</label>
            <input
              type="file"
              name="fotoKost"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Foto Luar Kamar:</label>
            <input
              type="file"
              name="fotoLuarKamar"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Foto Dalam Kamar:</label>
            <input
              type="file"
              name="fotoDalamKamar"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
      {/* Notification */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={showNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Successfully submit!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      silakan ke menu list untuk melihat daftar kost.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setShowNotification(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
