import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Container,
  CardMedia,
  CardActionArea,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { fetchAllStories } from "../../api/creepifyApi";

export default function CreepifyViewStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // Filter state for genre

  // Fetch stories on component mount
  useEffect(() => {
    const getStories = async () => {
      try {
        const data = await fetchAllStories(); // Fetch the stories from API

        // Check the data structure, assuming the stories are under data.data
        console.log("Fetched stories:", data.data);

        // Set the stories array using data.data
        if (Array.isArray(data.data)) {
          setStories(data.data); // If it's an array, set it to state
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    getStories(); // Call the function to fetch stories
  }, []);

  // Extract unique genres from stories
  const uniqueGenres = [
    ...new Set(stories.map((story) => story.genre.toLowerCase())), // To handle case-insensitive genres
  ];

  // Filter stories based on selected genre
  const filteredStories = stories.filter((story) =>
    story.genre.toLowerCase().includes(filter.toLowerCase()),
  );

  console.log(filteredStories);

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Display error message if there is any error
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error} {/* Show error message */}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Creepify: Read Stories
      </Typography>

      {/* Genre filter dropdown */}
      <Box sx={{ marginBottom: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel id="genre-filter-label">Genre</InputLabel>
          <Select
            labelId="genre-filter-label"
            value={filter}
            label="Genre"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            {/* Dynamically generate the genre options */}
            {uniqueGenres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}{" "}
                {/* Capitalize the first letter */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Map over the filtered stories and display them in cards */}
        {filteredStories.map((story) => (
          <Grid item xs={12} key={story.id}>
            <Card sx={{ width: "100%" }}>
              <CardActionArea>
                {story.mediaUrl && (
                  <CardMedia
                    component="img"
                    height="100%"
                    image={story.mediaUrl}
                    alt={story.title}
                    sx={{
                      width: "100%", // Make the image full width
                      objectFit: "cover", // Maintain aspect ratio
                    }}
                  />
                )}
                <CardContent sx={{ width: "100%" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {story.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {story.body}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: "15px" }}
                  >
                    Genre: {story.genre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {story.alias}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display a message if no stories match the selected genre */}
      {filteredStories.length === 0 && filter && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <Typography variant="h6" color="textSecondary">
            No stories available for the selected genre.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
