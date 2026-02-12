import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Divider,
  Alert,
  Stack,
} from "@mui/material";
import { checkHealth } from "../api/diagnosifyApi";

export default function Diagnosify() {
  const [symptomsInput, setSymptomsInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    try {
      setLoading(true);
      const symptoms = symptomsInput.split(",").map((s) => s.trim());

      const res = await checkHealth({ symptoms });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Unauthorized or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          🧠 Diagnosify Health Check
        </Typography>

        <TextField
          label="Enter symptoms (comma separated)"
          fullWidth
          sx={{ mt: 2 }}
          value={symptomsInput}
          onChange={(e) => setSymptomsInput(e.target.value)}
          placeholder="headache, fever, body pain"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Check Health"}
        </Button>

        {result && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6">Symptoms</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {result.symptoms.map((s, i) => (
                <Chip key={i} label={s} color="primary" />
              ))}
            </Stack>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Possible Sickness
            </Typography>
            {result.possible_sickness.map((d, i) => (
              <Chip key={i} label={d} color="error" sx={{ mr: 1, mb: 1 }} />
            ))}

            <Typography variant="h6" sx={{ mt: 2 }}>
              First Aid Recommendations
            </Typography>
            <ul>
              {result.first_aid.map((f, i) => (
                <li key={i}>
                  <Typography>{f}</Typography>
                </li>
              ))}
            </ul>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Doctors & Clinics
            </Typography>

            {result.doctors_and_clinics.map((doc, i) => (
              <Card key={i} sx={{ mt: 1, borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography fontWeight="bold">{doc.doctorName}</Typography>
                  <Typography color="text.secondary">
                    {doc.specialty}
                  </Typography>
                  <Typography>{doc.clinicName}</Typography>
                  <Typography fontSize="0.9rem">{doc.fullAddress}</Typography>
                </CardContent>
              </Card>
            ))}

            <Alert severity="warning" sx={{ mt: 2 }}>
              {result.disclaimer}
            </Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
}
