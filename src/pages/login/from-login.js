import {
  Card,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useState } from "react";
import { useAuth } from "../../services/context/auth";
const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ini masukin fungsi login dari auth.js
  const { login } = useAuth();

  // ini untuk handle login
  const handleLogin = () => {
    setLoading(true);

    login(email, password)
      .then((response) => {
        // setSuccess("Login success");
        if (response.status === 200) {
          setSuccess("Login success");
          setTimeout(() => {
            setLoading(true);
          }, 2000);
        } else {
          setSuccess("");
          setTimeout(() => {
            setLoading(true);
            setError("Login failed. Please check your credentials.");
          }, 1000);
        }

        setLoading(false);
      })
      .catch((error) => {
        setSuccess("");
        setError("Login failed. Please check your credentials.");

        setLoading(false);
      });
  };

  return (
    <div class="flex flex-col justify-center p-8 md:p-14">
      <Card color="transparent" shadow={false}>
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center gap-4">
            <img src="/logo_disdik.png" alt="logo" className="w-14 h-14" />
            <Typography variant="h4" className="text-black">
              AISA
            </Typography>
          </div>
        </div>
        <Typography
          variant="paragraph"
          color="gray"
          className="mt-2 text-center"
        >
          Access Intelligence System Applications
        </Typography>
        <form
          // onSubmit={Auth}
          className="mt-8 mb-2 w-96 max-w-screen-xl sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            {success && (
              <Alert color="green" className="text-center">
                {success}
              </Alert>
            )}

            {error && (
              <Alert color="red" className="text-center">
                {error}
              </Alert>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              disabled={loading}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              // className="!border-t-figma-blue focus:!border-t-figma-blue"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              disabled={loading}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            disabled={loading}
            onClick={handleLogin}
            className="mt-6 bg-light-blue-600"
            fullWidth
          >
            Log in
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default FormLogin;
