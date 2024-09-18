import {
  Box,
  Divider,
  Slider,
  Typography,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

// Tooltip that only shows on hover
function SliderHover(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default function VerticalFilter({ info, setFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("Best Selling"); // Default sort option

  const [value, setValue] = useState(1000); // Slider default value
  const [selectedSizes, setSelectedSizes] = useState([]); // Multiple size selections

  // Handle opening the sort menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the sort menu and setting the selected option
  const handleClose = (option) => {
    setSortOption(option);
    setAnchorEl(null);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle multiple size selection
  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSelectedSizes(
      (prevSelected) =>
        prevSelected.includes(selectedSize)
          ? prevSelected.filter((size) => size !== selectedSize) // Uncheck size
          : [...prevSelected, selectedSize] // Check size
    );
  };

  // Define marks with a breakpoint
  const marks = [
    {
      value: info?.lowest_price,
      label: `${info?.lowest_price}`,
    },
    {
      value: info?.highest_price / 2,
      label: `${info?.highest_price / 2}`, // Halfway mark
    },
    {
      value: info?.highest_price,
      label: `${info?.highest_price}`,
    },
  ];

  const filterData = useCallback(async () => {
    setFilter({
      sort_by: sortOption,
      price: value,
      sizes: selectedSizes,
    });
  }, [sortOption, value, selectedSizes]);

  useEffect(() => {
    setFilter({
      sort_by: sortOption,
      sizes: selectedSizes,
    });
  }, [sortOption, selectedSizes]);

  return (
    <Box sx={{ width: "80%", px: 2 }}>
      <Typography variant="h5" sx={{ color: "black" }}>
        Filter
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          width: "100%",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* Sort By Button */}
        <Typography variant="body1" sx={{ mr: 2 }}>
          Sort by:
        </Typography>
        <Button
          variant="contained"
          aria-controls="sort-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ textTransform: "none" }}
        >
          {sortOption}
        </Button>

        {/* Sort Menu */}
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose(sortOption)}
        >
          <MenuItem onClick={() => handleClose("Best Selling")}>
            Best Selling
          </MenuItem>
          <MenuItem onClick={() => handleClose("A-Z")}>A-Z</MenuItem>
          <MenuItem onClick={() => handleClose("Z-A")}>Z-A</MenuItem>
          <MenuItem onClick={() => handleClose("High to Low")}>
            High to Low
          </MenuItem>
          <MenuItem onClick={() => handleClose("Low to High")}>
            Low to High
          </MenuItem>
        </Menu>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Price
        </Typography>
        <Slider
          value={value}
          min={info?.lowest_price}
          max={info?.highest_price}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          components={{
            ValueLabel: SliderHover, // Custom label component for hover effect
          }}
          marks={marks} // Apply the marks to the slider
          sx={{
            "&:hover .MuiSlider-thumb": {
              boxShadow: "0px 0px 0px 8px rgba(58, 133, 137, 0.16)", // Slight glow effect on hover
            },
          }}
        />
        <Typography variant="caption">Current Value: {value}</Typography>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Size
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {info?.sizes?.map((size) => (
            <FormControlLabel
              key={size.size}
              control={
                <Checkbox
                  checked={selectedSizes.includes(size.size)}
                  onChange={handleSizeChange}
                  value={size.size}
                />
              }
              label={size.size}
            />
          ))}
        </Box>
        <Typography variant="caption" sx={{ mt: 1 }}>
          Selected Sizes: {selectedSizes.join(", ") || "None"}
        </Typography>
      </Box>
      <Button onClick={filterData} variant="contained" sx={{ mt: 2 }}>
        Apply
      </Button>
    </Box>
  );
}
