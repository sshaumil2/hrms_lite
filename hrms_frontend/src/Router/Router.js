import Login from "../Login/Login";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Router/AdminLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthorListing from "../pages/Author/AuthorListing";
import Category from "../pages/category/Category";
import BlogListing from "../pages/blogs/BlogListing";
import AddBlog from "../pages/blogs/AddBlog";
import EditBlog from "../pages/blogs/EditBlog";
import Contact from "../pages/Contact/Contact";
import SeoListing from "../pages/Seo/SeoListing";
import SeoCreate from "../pages/Seo/SeoCreate";
import SeoEdit from "../pages/Seo/SeoEdit";
import BusinessForm from "../pages/Contact/BusinessForm";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path={"login"} element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="author" element={<AuthorListing />} />
          <Route path="category" element={<Category />} />

          <Route path="blog" element={<BlogListing />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:blog_id" element={<EditBlog />} />

          <Route path="contact" element={<Contact />} />
          <Route path="business-contact" element={<BusinessForm />} />

          <Route path="seo" element={<SeoListing />} />
          <Route path="add-seo" element={<SeoCreate />} />
          <Route path="edit-seo/:seo_id" element={<SeoEdit />} />
        </Route>
      </Routes>
    </>
  )
}
