import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [locations, setLocations] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [minSalary, setMinSalary] = useState([]);
  const [minExp, setMinExp] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [selectedMinSalary, setSelectedMinSalary] = useState("");
  const [selectedMinExp, setSelectedMinExp] = useState("");

  const fetchData = async (offset) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: limit,
        offset: offset,
      }),
    };

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const result = await response.json();
      return result.jdList;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchData(0).then((initialData) => {
      setData(initialData);
      setOffset(limit);
      setLocations([...new Set(initialData.map((item) => item.location))]);
      setJobRoles([...new Set(initialData.map((item) => item.jobRole))]);
      setMinSalary([...new Set(initialData.map((item) => item.minJdSalary))]);
      setMinExp([...new Set(initialData.map((item) => item.minExp))]);
    });
  }, []);

  const loadMore = () => {
    fetchData(offset).then((nextData) => {
      setData((prevData) => [...prevData, ...nextData]);
      setOffset((prevOffset) => prevOffset + limit);
    });
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleJobRoleChange = (event) => {
    setSelectedJobRole(event.target.value);
  };

  const handleMinSalaryChange = (event) => {
    setSelectedMinSalary(event.target.value);
  };

  const handleMinExpChange = (event) => {
    setSelectedMinExp(event.target.value);
  };

  return (
    <>
      <div>
        {data.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <FormControl style={{ width: "20vw", marginRight: "20px" }}>
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {locations.map((location, index) => (
                    <MenuItem key={index} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "20vw", marginRight: "20px" }}>
                <InputLabel id="jobrole-label">Job Role</InputLabel>
                <Select
                  labelId="jobrole-label"
                  id="jobrole"
                  value={selectedJobRole}
                  onChange={handleJobRoleChange}
                >
                  <MenuItem value="">All Job Roles</MenuItem>
                  {jobRoles.map((jobRole, index) => (
                    <MenuItem key={index} value={jobRole}>
                      {jobRole}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "20vw", marginRight: "20px" }}>
                <InputLabel id="minsalary-label">Min Salary</InputLabel>
                <Select
                  labelId="minsalary-label"
                  id="minsalary"
                  value={selectedMinSalary}
                  onChange={handleMinSalaryChange}
                >
                  <MenuItem value="">No Min Salary</MenuItem>
                  {minSalary.map((minSal, index) => (
                    <MenuItem key={index} value={minSal}>
                      {minSal}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "20vw", marginRight: "20px" }}>
                <InputLabel id="minexp-label">Min Exp</InputLabel>
                <Select
                  labelId="minexp-label"
                  id="minexp"
                  value={selectedMinExp}
                  onChange={handleMinExpChange}
                >
                  <MenuItem value="">No Min Exp</MenuItem>
                  {minExp.map((minExp, index) => (
                    <MenuItem key={index} value={minExp}>
                      {minExp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Grid container spacing={3}>
              {data
                .filter(
                  (item) =>
                    (!selectedLocation || item.location === selectedLocation) &&
                    (!selectedJobRole || item.jobRole === selectedJobRole) &&
                    (!selectedMinSalary ||
                      item.minJdSalary >= selectedMinSalary) &&
                    (!selectedMinExp || item.minExp >= selectedMinExp)
                )
                .map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Cards {...item} />
                  </Grid>
                ))}
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button onClick={loadMore} style={{ fontSize: "1.2rem" }}>
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
