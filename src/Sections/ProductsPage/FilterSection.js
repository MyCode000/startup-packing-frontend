//react
import { useCallback, useEffect, useState } from "react";
//mui
import { Box } from "@mui/material";
// Component
import VerticalFilter from "../../Components/__productsPage/VerticalFilter";
import HorizontalFilter from "../../Components/__productsPage/HorizontalFilter";
//__api__
import { fetchInfoRequest } from "../../__api__/products";

//-------------------------------------------------------------

export default function FilterSection({ setFilter }) {
  const [infoData, setInfoData] = useState();

  // Fetch Info data
  const fetchInfoData = useCallback(async () => {
    fetchInfoRequest()
      .then((response) => {
        setInfoData(response);
      })
      .catch((error) => {
        console.error("Error fetching Info", error);
      });
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchInfoData();
  }, []);

  return (
    <Box>
      {/* Vertical filter for larger screens */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <VerticalFilter info={infoData} setFilter={setFilter} />
      </Box>
      {/* Horizontal filter for smaller screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <HorizontalFilter info={infoData} setFilter={setFilter} />
      </Box>
    </Box>
  );
}
