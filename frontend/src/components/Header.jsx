import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Header = ({ components, design_id }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: components,
      };
      console.log(obj);
      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);

      try {
        setLoader(true);
        const { data } = await api.put(
          `/api/update-user-design/${design_id}`,
          formData
        );
        toast.success(data.message);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    var link = document.createElement("a");
    link.download = "image.png"; // Specify the file name with .png extension
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const getDiv = document.getElementById("main_design");

    const options = {
      margin: 0.5, // Margins in inches
      filename: "design.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate and download the PDF
    html2pdf().from(getDiv).set(options).save();
  };

  return (
    <div className="h-[60px] bg-gradient-to-r from-[#212122] via-[#27282b] to-[#2a2b2c] w-full">
      <div className="flex items-center justify-between h-full px-10 text-gray-300">
        <Link to="/">
          <img
            src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
            alt=""
          />
        </Link>
        <span className="text-xl">Broucher Builder</span>
        <div className="flex items-center justify-center gap-2 text-gray-300">
          <button
            disabled={loader}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            {loader ? "Loading..." : "Save"}
          </button>
          <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download PNG
          </button>
          <button
            onClick={downloadPDF}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
