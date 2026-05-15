import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./ui/AppLayout"
import { HomePage } from "./views/HomePage"
import { ExamplePage } from "./views/ExamplePage"
import { BlogOnePage, BlogTwoPage, BlogThreePage } from "./views/BlogPages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "example", element: <ExamplePage /> },
      { path: "blog-posts/one", element: <BlogOnePage /> },
      { path: "blog-posts/two", element: <BlogTwoPage /> },
      { path: "blog-posts/three", element: <BlogThreePage /> },
    ],
  },
])
