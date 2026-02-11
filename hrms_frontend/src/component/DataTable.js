import { useEffect } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.html5.js"; // Required for Excel export
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";

// import JSZip from "jszip";
// window.JSZip = JSZip;

// const formatDate = (isoString) => {
//   const date = new Date(isoString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//   const year = date.getFullYear();

//   return `${day}-${month}-${year}`;
// };

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g. "Aug"
  const year = date.getFullYear() //.toString().slice(-2); // "25" for 2025
  return `${month} ${year}`;
};

const formatValue = (body, value) => {
  if (!value) return "N/A"; // Handle empty values globally

  const formattedFields = {
    createdAt: formatDate(value), // Format createdAt
    date: formatDate(value), // Format updatedAt if needed
    source_url: <a href={value} target="_blank" rel="noreferrer">{value}</a>, // Render as a link
    status: <span className={value === "1"? "status-btn-inactive" : "status-btn-active"}>{value === "1" ? "Disabled" : "Enabled"}</span>, // Render as a link
  };

  return formattedFields[body] || value; // Return formatted value or default
};

export default function DataTable({ data, tableHeader, tbody, editPath, onDelete, showAction = true,setModalShow, setId }) {

  useEffect(() => {
  const initializeDataTable = () => {
    const table = $("#example3").DataTable({
      destroy: true,
      paging: false,
      pagingType: "full_numbers",
      pageLength: 10,
      processing: true,
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "print"],
      initComplete: function () {
        $(".dt-search input").attr("placeholder", "Search Here");
      },
      drawCallback: function () {
        // Move .dt-search outside (v2 search wrapper)
        if ($(".dt-search").parent().attr("id") !== "datatable-search") {
          $(".dt-search").appendTo("#datatable-search");
        }
      }
    });

    // Move buttons outside
    table.buttons().container().appendTo("#datatable-buttons");

    // Initial move of search
    $(".dt-search").appendTo("#datatable-search");
    };

    if (data && data.length > 0) {
      setTimeout(initializeDataTable, 500);
    }

    return () => {
      if ($.fn.DataTable.isDataTable("#example3")) {
        $("#example3").DataTable().destroy();
      }
    };
  }, [data?.length]);

  return (
    <>
    <div className="datatable-control">
        <div id="datatable-search"></div>
        <div id="datatable-buttons"></div>
    </div>

    <div className="table-responsive">
      <table id="example3" className="my-data-table">
        <thead>
          <tr>
            {/* head one static last static (middels are dynamic) */}
            <th>S.No</th>
            {tableHeader.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {showAction && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {data?.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {/* first row is static */}
              <td>{rowIndex + 1}</td>
              {tbody && tbody.map((body, colIndex) => (
                <td key={colIndex}>{formatValue(body, item[body])}</td>
              ))}
              {/* last row static*/}
              {showAction && (
                <td>
                  <div className="table-btn-group">
                    {editPath? 
                    ( <Link to={`/${editPath}/${item._id}`} className="edit-btn"><img src="/assets/admin-edit.webp" alt="edit" className="img-responsive" /></Link>
                    ):(
                      <Link onClick={() => {setModalShow(true); setId(item._id)}} className="edit-btn"><img src="/assets/admin-edit.webp" alt="edit" className="img-responsive" /></Link>
                    )}
                  
                    {onDelete && <Link className="delete-btn" onClick={() => onDelete(item._id)}><img src="/assets/admin-delete.webp" alt="delete" className="img-responsive" /></Link>}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
