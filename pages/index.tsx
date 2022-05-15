import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface User {
  id: number;
  username: string;
  fname: string;
  lname: string;
  avatar: string;
}
export interface Pet {
  id: number;
  name: string;
  avatar: string;
}

export interface Pet {}
const Home: NextPage = ({ data }: any) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {data.users.map((user: User) => (
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={user.avatar}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.fname} {user.lname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.lname}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`/user/${user.id}`}>
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8002/user`);

  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
};

export default Home;
