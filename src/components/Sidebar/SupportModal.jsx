// ../components/Sidebar/SupportModal.jsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const messagesByIssueType = {
  general:
    "Thank you for your feedback. We appreciate you taking the time to let us know how we can improve!",
  bug:
    "Thank you for reporting a technical issue. Our team will investigate and respond if we need more information.",
  feature:
    "Thank you for suggesting a new feature. We value your input and may follow up for further details.",
  "ui-ux":
    "Thank you for sharing your design suggestions. We’ll consider them in future improvements to enhance your experience.",
  "enterprise-request":
    "Thank you for your interest in our Enterprise plan. Our team will follow up with more details about custom options.",
};

const defaultMessage =
  "Thank you for your inquiry. Our team will review your submission and respond if necessary.";

export default function SupportModal({ open, onClose, initialIssueType = "general" }) {
  // Form fields
  const [feedback, setFeedback] = React.useState("");
  const [businessDetails, setBusinessDetails] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [issueType, setIssueType] = React.useState(initialIssueType);

  // Submission states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionSuccess, setSubmissionSuccess] = React.useState(false);
  const [ticketNumber, setTicketNumber] = React.useState(null);

  // Track if user has attempted to submit (to show error messages)
  const [attemptedSubmit, setAttemptedSubmit] = React.useState(false);

  // Reset fields whenever the modal opens
  React.useEffect(() => {
    if (open) {
      setFeedback("");
      setBusinessDetails("");
      setRating(0);
      setIssueType(initialIssueType);
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setTicketNumber(null);
      setAttemptedSubmit(false);
    }
  }, [open, initialIssueType]);

  const isEnterpriseRequest = issueType === "enterprise-request";

  // Field validation checks
  const ratingValid = rating > 0;
  const feedbackValid = feedback.trim().length > 0;
  const businessDetailsValid = businessDetails.trim().length > 0;

  const handleSubmit = () => {
    // Mark that the user tried to submit
    setAttemptedSubmit(true);

    // If the form is invalid, stop here (just show errors)
    if (!ratingValid) return;
    if (!issueType) return;
    if (isEnterpriseRequest && !businessDetailsValid) return;
    if (!isEnterpriseRequest && !feedbackValid) return;

    // Otherwise, proceed with submission
    setIsSubmitting(true);
    const userUUID = localStorage.getItem("userUUID");
    const userToken = localStorage.getItem("userToken");
    const API_URL =
      import.meta.env.VITE_API_URL || "https://vaclaimguard.azurewebsites.net";

    const submissionData = {
      user_uuid: userUUID,
      rating,
      issue_type: issueType,
      feedback: isEnterpriseRequest ? businessDetails : feedback,
    };

    fetch(`${API_URL}/support_modal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to submit feedback. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.ticket_number) {
          setTicketNumber(data.ticket_number);
        }
        setSubmissionSuccess(true);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClose = () => {
    onClose();
  };

  // If feedback was successfully submitted, show a thank-you screen
  if (submissionSuccess) {
    const thankYouMessage = messagesByIssueType[issueType] || defaultMessage;
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Thank You</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">{thankYouMessage}</Typography>
          {ticketNumber && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Your ticket number is:</strong> {ticketNumber}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>How can we help?</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Please rate your experience and let us know what's on your mind.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Overall Rating */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1">Overall Rating:</Typography>
              <Rating
                name="feedback-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
            </Box>
            {/* Error message if user tried to submit without rating */}
            {attemptedSubmit && !ratingValid && (
              <Typography variant="caption" color="error">
                Please provide a rating.
              </Typography>
            )}
          </Box>

          {/* Issue Type Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="issue-type-label">Issue Type</InputLabel>
            <Select
              labelId="issue-type-label"
              id="issue-type"
              label="Issue Type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <MenuItem value="general">General Feedback</MenuItem>
              <MenuItem value="bug">Error/Technical Issue</MenuItem>
              <MenuItem value="feature">Feature Request</MenuItem>
              <MenuItem value="ui-ux">Design Suggestion</MenuItem>
              <MenuItem value="enterprise-request">Enterprise Info Request</MenuItem>
            </Select>
          </FormControl>

          {/* Text Field: either businessDetails or general feedback */}
          {isEnterpriseRequest ? (
            <TextField
              fullWidth
              label="Tell us more about your business needs"
              multiline
              rows={4}
              variant="outlined"
              value={businessDetails}
              onChange={(e) => setBusinessDetails(e.target.value)}
              placeholder="Example: 'We need a custom limit for 15+ team members...' "
              error={attemptedSubmit && !businessDetailsValid}
              helperText={
                attemptedSubmit && !businessDetailsValid
                  ? "Please provide more details about your business needs."
                  : ""
              }
            />
          ) : (
            <TextField
              fullWidth
              label="Tell us more..."
              multiline
              rows={4}
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Example: 'There is an error when I try to upload files.'"
              error={attemptedSubmit && !feedbackValid}
              helperText={
                attemptedSubmit && !feedbackValid
                  ? "Please describe your feedback, issue, or request."
                  : ""
              }
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ textTransform: "none" }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        {/* Allow user to click even if invalid to show errors */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ textTransform: "none", minWidth: 100 }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
