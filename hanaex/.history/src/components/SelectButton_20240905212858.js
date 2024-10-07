import React from "react";
import { Button } from "@chakra-ui/react";
const SelectButton = ({ onOpen, handleSelectClick }) => {
  const handleOpenClick = () => {
    onOpen();
    handleSelectClick();
  };
  return (
    // <Button
    //   colorScheme="blue"
    //   mr={3}
    //   onClick={handleOpenClick}
    //   variant="outline"
    //   height="42px"
    //   width="200px"
    // >
    //   조회/변경
    // </Button>
    <button
      onClick={handleOpenClick}
      className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-all mr-3"
      style={{ height: "42px", width: "200px" }}
    >
      조회/변경
    </button>
  );
};

export default SelectButton;
