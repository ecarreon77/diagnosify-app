import React, { useState } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { createStory } from "../../api/creepifyApi";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";

const CreepifySendStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    genre: "",
    alias: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // ✅ start loading only here

      const response = await createStory({
        data: formData,
        file,
      });

      console.log("Story created:", response.data);

      showSnackbar("Story submitted successfully! ✅", "success");
      navigate("/creepify");

      setFormData({
        title: "",
        body: "",
        genre: "",
        alias: "",
      });

      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit story");
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Card
          sx={{
            backgroundColor: "rgba(0,0,0,0.08)",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              👻 Send Your Story
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              Share your creepy experience anonymously.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* TITLE */}
              <TextField
                label="Story Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />

              {/* BODY */}
              <TextField
                label="Story Body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                multiline
                rows={8}
                fullWidth
                required
              />

              {/* GENRE */}
              <FormControl fullWidth required>
                <InputLabel>Genre</InputLabel>

                <Select
                  name="genre"
                  value={formData.genre}
                  label="Genre"
                  onChange={handleChange}
                >
                  <MenuItem value="Horror">Horror</MenuItem>
                  <MenuItem value="Thriller">Thriller</MenuItem>
                  <MenuItem value="Mystery">Mystery</MenuItem>
                  <MenuItem value="Paranormal">Paranormal</MenuItem>
                  <MenuItem value="Urban Legend">Urban Legend</MenuItem>
                </Select>
              </FormControl>

              {/* ALIAS */}
              <TextField
                label="Alias (Optional)"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                fullWidth
              />

              {/* FILE */}
              <Box>
                <Button variant="contained" component="label">
                  Upload Image
                  <input hidden type="file" onChange={handleFileChange} />
                </Button>

                {file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {file.name}
                  </Typography>
                )}
              </Box>

              {/* SUBMIT */}
              <Button type="submit" variant="contained" size="large">
                Submit Story
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CreepifySendStory;
