import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              label={"Full name"}
              placeholder={"fullname"}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type="email"
              label={"Email"}
              placeholder={"email"}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type="password"
              label={"Password"}
              placeholder={"password"}
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Do you have an account?</Typography>
            <Link component={RouterLink} color="inherit" to={"/auth"}>
              Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
