export const ApiEndpoints = {
  autor: {
    authorList: "api/authors",
    authorCreate: "api/author/store",
    authorEdit: "api/author/edit/",
    authorUpdate: "api/author/update",
    authorDelete: "api/author/delete",
  },

  adminBlogs: {
    blogList: "api/blogs",
    blogCreate: "api/blog/store",
    blogEdit: "api/blog/edit/",
    blogUpdate: "api/blog/update/",
    blogDelete: "api/blog/delete",
  },

  category: {
    categoryList: "api/blog-categories",
    categoryCreate: "api/blog-category/store",
    categoryEdit: "api/blog-category/edit/",
    categoryUpdate: "api/blog-category/update",
    categoryDelete: "api/blog-category/delete",
  },

  contact: {
    contactCreate: "api/contact/store",
    contactList: "api/contact/view",
  },

  seo: {
    seoList: "api/seo",
    seoCreate: "api/seo/store",
    seoEdit: "api/seo/edit/",
    seoUpdate: "api/seo/update",
    seoDelete: "api/seo/delete",
    seoByUrl: 'api/seo-by-url'
  },

  Dashboard:{
    List:"api/leads-count",
    monthlycount:"api/leads-count-filter"
  }
};
