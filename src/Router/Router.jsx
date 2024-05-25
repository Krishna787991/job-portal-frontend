
import { defaults } from "autoprefixer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import JobDetails from "../Pages/JobDetails";
import Login from "../components/Login";
import Signup from "../components/Signup";
import EditJob from "../Pages/EditJob";
import AppliedJobs from "../Pages/AppliedJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/",element: <Home />},
      {path: "/post-job",element: <CreateJob/>},
      {path:"/my-job",element:<MyJobs/>},
      {path:"/job-details",element:<JobDetails/>},
      {path:"/login",element:<Login/>},
      {path:"/signup",element:<Signup/>},
      {path:"/edit-jobs/:jobs_id",element:<EditJob/>},
      {path:"/about",element:<About/>},
      {path:"/applied-job",element:<AppliedJobs/>},
    ]
  },
]);

export default router;