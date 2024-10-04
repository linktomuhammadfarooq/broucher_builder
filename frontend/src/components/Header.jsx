import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf"; // Import jsPDF
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

  const downloadPDF = async () => {
    const getDiv = document.getElementById("main_design");

    // Convert the design into a canvas using html-to-image
    const canvas = await htmlToImage.toCanvas(getDiv);

    // Initialize jsPDF
    const pdf = new jsPDF();

    // Add the image (design) to the PDF
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 190; // PDF width for image
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Now, let's overlay clickable links on top of the image

    const elements = getDiv.querySelectorAll("a"); // Get all anchor tags in the design

    elements.forEach((el) => {
      const href = el.getAttribute("href");
      const rect = el.getBoundingClientRect(); // Get the element's position and size in the DOM

      // Convert DOM position to PDF units
      const xPos = (rect.left / getDiv.offsetWidth) * imgWidth + 10; // Adjust for margins
      const yPos = (rect.top / getDiv.offsetHeight) * imgHeight + position;

      // Overlay the clickable link on the PDF
      pdf.link(
        xPos,
        yPos,
        (rect.width / getDiv.offsetWidth) * imgWidth,
        (rect.height / getDiv.offsetHeight) * imgHeight,
        { url: href }
      );
    });

    // Save the PDF with the design and clickable links
    pdf.save("design_with_clickable_links.pdf");
  };

  return (
    <div className="h-[60px] bg-gradient-to-r from-[#212122] via-[#27282b] to-[#2a2b2c] w-full">
      <div className="flex items-center justify-between h-full px-10 text-gray-300">
        <Link to="/">
          {/* <img
            src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
            alt=""
          /> */}
          Brochure Builder
        </Link>
        {/* <span className="text-xl">Brochure Builder</span> */}
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
