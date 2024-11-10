import React, { useEffect, useState } from "react";
import "./Style/Blogs.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router";
import { ApiUrl } from "../ApiUrl";
import getData from "../Methods";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogsdata, setBlogsData] = useState([]);
  
  useEffect(() => {
    getBlogs();
  }, []);
  
  const getBlogs = async () => {
    try {
      const response = await getData(ApiUrl.GETBLOG);
      if (response.status === 200) {
        setBlogsData(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

 
  const extractTextAndLimit = (htmlContent, limit) => {
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, ""); 
    return plainText.length > limit ? plainText.substring(0, limit) + "..." : plainText;
  };

  return (
    <div className="Blogs">
      {blogsdata.map((ele, index) => (
        <Card key={index} sx={{ maxWidth: 445 }} onClick={() => navigate(`/blogs/${ele.page_slug}`)}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="auto"
              image={`${ApiUrl.IMAGEURL}/BlogImage/${ele.blogImg}`}
              alt="blog image"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="CardMainHeading"
              >
                {ele.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="justify"
              >
                {extractTextAndLimit(ele.subtitle, 200)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" >
              Read More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Blogs;
