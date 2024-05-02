/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
} from "@mui/material";

const Cards = (item) => {
  console.log(item);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleViewMoreClick = () => {
    setExpanded(!expanded);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleViewJobClick = () => {
    // Placeholder function for handling the "View Job" button click
    console.log("View Job clicked");
  };

  return (
    <Grid>
      <Card
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hovered && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewJobClick}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
              color: "white",
              border: "2px solid white",
            }}
          >
            View Job
          </Button>
        )}
        <CardHeader title={item?.jobRole} subheader={item?.location} />

        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.minJdSalary !== null && (
              <Typography style={{ marginBottom: "10px", fontSize: "1rem" }}>
                Min Salary: {item.minJdSalary} USD
              </Typography>
            )}
            {item.minExp !== null && (
              <Typography style={{ marginBottom: "10px", fontSize: "1rem" }}>
                Min Exp: {item.minExp} Yrs
              </Typography>
            )}
          </div>
          <Typography variant="h6" component="div">
            About Company
          </Typography>
          <Typography variant="h7" component="div">
            About Us
          </Typography>
          <p>
            {expanded
              ? item?.jobDetailsFromCompany
              : item?.jobDetailsFromCompany.slice(0, 100)}
            {!expanded && "..."}
          </p>
          {!expanded ? (
            <Button onClick={handleViewMoreClick}>View More</Button>
          ) : (
            <Button onClick={() => setExpanded(false)}>View Less</Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Cards;
