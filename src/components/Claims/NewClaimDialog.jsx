// src/components/Claims/NewClaimDialog.jsx

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';

// Import from local mock data instead of real fetch
import { fetchMockConditions } from '../../data/mockConditions';

const NewClaimDialog = ({ open, onClose, onSave, initialData }) => {
  const [claimName, setClaimName] = useState('');
  const [status, setStatus] = useState('Draft');
  const [description, setDescription] = useState('');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [conditionsOptions, setConditionsOptions] = useState([]);

  // Load conditions from local mock data (instead of real API)
  useEffect(() => {
    async function fetchConditionsLocally() {
      try {
        const data = await fetchMockConditions();
        setConditionsOptions(data);
      } catch (error) {
        console.error('Error loading mock conditions:', error);
      }
    }
    fetchConditionsLocally();
  }, []);

  // Populate form fields if editing an existing claim
  useEffect(() => {
    if (initialData) {
      setClaimName(initialData.claim_name || '');
      setStatus(initialData.status || 'Draft');
      setDescription(initialData.description || '');
      setSelectedConditions(initialData.condition_ids || []);
    } else {
      setClaimName('');
      setStatus('Draft');
      setDescription('');
      setSelectedConditions([]);
    }
  }, [initialData, open]);

  // Handler when user clicks "Save"
  const handleSave = () => {
    if (!claimName) {
      // Optionally show validation (toast, error text, etc.)
      return;
    }
    const claimData = {
      claim_name: claimName,
      status,
      description,
      condition_ids: selectedConditions, 
    };
    onSave(claimData);
  };

  // Handler for selecting multiple conditions
  const handleConditionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedConditions(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Claim' : 'Add New Claim'}</DialogTitle>
      <DialogContent>
        {/* Claim Name */}
        <TextField
          autoFocus
          margin="dense"
          label="Claim Name"
          type="text"
          fullWidth
          variant="standard"
          value={claimName}
          onChange={(e) => setClaimName(e.target.value)}
        />

        {/* Description */}
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Status (if you want a dropdown) */}
        {/* 
        <FormControl margin="dense" variant="standard" fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Submitted">Submitted</MenuItem>
          </Select>
        </FormControl> 
        */}

        {/* Conditions (multi-select) */}
        <FormControl fullWidth margin="dense">
          <InputLabel id="conditions-select-label">Conditions</InputLabel>
          <Select
            labelId="conditions-select-label"
            multiple
            value={selectedConditions}
            onChange={handleConditionChange}
            input={<OutlinedInput label="Conditions" />}
            renderValue={(selected) => {
              // Show condition_name instead of ID
              const labels = selected
                .map((id) => {
                  const found = conditionsOptions.find(
                    (opt) => opt.condition_id === id
                  );
                  return found ? found.condition_name : id;
                })
                .join(', ');
              return labels || 'No Conditions Selected';
            }}
          >
            {conditionsOptions.map((option) => (
              <MenuItem key={option.condition_id} value={option.condition_id}>
                <Checkbox
                  checked={selectedConditions.indexOf(option.condition_id) > -1}
                />
                <ListItemText primary={option.condition_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>
          {initialData ? 'Save Changes' : 'Add Claim'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewClaimDialog;
