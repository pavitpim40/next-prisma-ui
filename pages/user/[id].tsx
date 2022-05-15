import { GetStaticProps, GetStaticPaths } from "next";
import { User, Pet } from "../index";
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
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function User({ data }: any) {
  return (
    <Container maxWidth="sm">
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          image={data.user.avatar}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.user.fname} {data.user.lname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.user.username}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            {data.user.pets.map((pet: Pet) => (
              <>
                <Avatar
                  alt={pet.name}
                  src={pet.avatar}
                  sx={{ width: 56, height: 56 }}
                />
                {pet.name}
              </>
            ))}
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`http://localhost:8002/user/${context.params?.id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:8002/user");
  const data = await res.json();
  console.log(data);
  // Get the paths we want to pre-render based on posts
  const paths = data.users.map((user: User) => ({
    params: { id: String(user.id) },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default User;
