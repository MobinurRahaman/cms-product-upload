import React from "react";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const CustomInputBase = styled(InputBase)`
  padding: 2px 10px;
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  border: 2px solid #444854;
  box-sizing: border-box;
  font-family: "Josefin Sans", sans-serif;

  &:focus {
    outline: none;
    border-color: #fff; // Customize the border color on focus
  }
`;

function StyedInputBase(props) {
  return <CustomInputBase {...props} />;
}

export default StyedInputBase;
