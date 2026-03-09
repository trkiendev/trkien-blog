export const adminRoutes = {
      adminPosts: "/admin/content/posts",
      adminPostsCreate: "/admin/content/posts/create",
      adminPostsEdit: (id: string) => `/admin/content/posts/${id}/edit`
};