import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import {
  Box,
  Card,
  CardContent,
  Typography,
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
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getStories = async () => {
      try {
        const data = await fetchAllStories();

        console.log("Fetched stories:", data.data.content);

        if (Array.isArray(data.data.content)) {
          setStories(data.data.content);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getStories();
  }, []);

  const uniqueGenres = [
    ...new Set(stories.map((story) => story.genre.toLowerCase())),
  ];

  const filteredStories = stories.filter((story) =>
    story.genre.toLowerCase().includes(filter.toLowerCase()),
  );

  console.log(filteredStories);

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {loading && <Loading />}
      <Container maxWidth="lg" sx={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Creepify: Read Stories
        </Typography>

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
              {uniqueGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredStories.map((story) => (
            <Grid item xs={12} key={story.id}>
              <Card
                sx={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
              >
                <CardActionArea>
                  {story.mediaUrl && (
                    <CardMedia
                      component="img"
                      height="100%"
                      image={story.mediaUrl}
                      alt={story.title}
                      sx={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <CardContent sx={{ width: "100%" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {story.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {story.body}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: "15px" }}
                    >
                      Genre: {story.genre}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Sender: {story.alias}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredStories.length === 0 && filter && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Typography variant="h6" color="textSecondary">
              No stories available for the selected genre.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
