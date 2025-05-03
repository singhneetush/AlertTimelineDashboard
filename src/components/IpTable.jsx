import React, { useState, useEffect } from "react";

const IpTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const initialFiltered = data.filter(
      (d) => d.src_ip && d.dest_ip && d.dest_port && d.proto
    );
    setFilteredArray(initialFiltered);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3) {
        filterProto();
      } else {
        const resetFiltered = data.filter(
          (d) => d.src_ip && d.dest_ip && d.dest_port && d.proto
        );
        setFilteredArray(resetFiltered);
      }
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, data]);

  const filterProto = () => {
    setLoading(true);
    const lowerSearch = searchTerm.toLowerCase();

    const protocolArray = data.filter(
      (d) =>
        d.proto &&
        d.src_ip &&
        d.dest_ip &&
        d.dest_port &&
        (d.proto.toLowerCase().includes(lowerSearch) ||
          d.dest_port.toString().includes(lowerSearch))
    );

    setFilteredArray(protocolArray);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const resetFiltered = data.filter(
      (d) => d.src_ip && d.dest_ip && d.dest_port && d.proto
    );
    setFilteredArray(resetFiltered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);

  return (
    <>
      {/* Wrapper */}
      <div className="w-full max-w-7xl mx-auto bg-[#1e1e1e] rounded-xl p-4 shadow-md my-6">
        {/* Header + Search Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center mb-4 gap-4">
          <h2 className="text-white text-xl font-semibold text-center md:text-left">
            Source & Destination IP Table
          </h2>

          <div className="flex flex-col w-full md:w-auto">
            <form className="w-full md:w-[24rem]">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type protocol or port"
                />
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-white absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Clear
                </button>
              </div>
            </form>

            <div className="flex justify-end text-white text-sm mt-2">
              {filteredArray.length} Entries Found
            </div>
          </div>
        </div>

        {/* Table - horizontally scrollable on small screens */}
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-white border-collapse table-auto">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Source IP</th>
                  <th className="p-2 text-left">Destination IP</th>
                  <th className="p-2 text-left">Protocol</th>
                  <th className="p-2 text-left">Dest Port</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-700/40"
                    >
                      <td className="p-2">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="p-2">{item.src_ip}</td>
                      <td className="p-2">{item.dest_ip}</td>
                      <td className="p-2">{item.proto}</td>
                      <td className="p-2">{item.dest_port}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-red-500">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredArray.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 text-white">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default IpTable;
