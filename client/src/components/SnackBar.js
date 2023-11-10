import { Alert, Snackbar } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function SnackBar({
  severity,
  text,
  open,
  handleClose,
  autoHideDuration,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 3000} // default 3000ms
      onClose={handleClose}
      sx={{ color: "#fff", fill: "#fff" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity} // "error", "warning", "info", "success"
        sx={{
          width: "100%",
          bgcolor: (theme) =>
            ["error", "warning", "info", "success"].includes(severity)
              ? theme.palette[severity].main
              : "#121212",
          color: "#fff",
          ".MuiAlert-icon": { color: "#fff" },
        }}
      >
        {/* Text to show in the alert */}
        {text}
      </Alert>
    </Snackbar>
  );
}

// prop types
SnackBar.propTypes = {
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired, // severity types
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
};
