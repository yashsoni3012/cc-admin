// src/api/endpoints.js

const BASE_URL = "";

export const API = {

  CATEGORY: {
    LIST: `/api/category/`,
    DETAIL: (id) => `/api/category/${id}/`,
  },

  COURSES: {
    LIST: `/api/course/`,
    DETAIL: (id) => `/api/course/${id}/`,
  },

  FAQS: {
    LIST: `/api/faqs/`,
    DETAIL: (id) => `/api/faqs/${id}/`,
  },

  MODULES: {
    LIST: `/api/modules/`,
    DETAIL: (id) => `/api/modules/${id}/`,
  },

  TOPICS: {
    LIST: `/api/topics/`,
    DETAIL: (id) => `/api/topics/${id}/`,
  },

  BANNERS: {
    LIST: `/api/banners/`,
    DETAIL: (id) => `/api/banners/${id}/`,
  },

  TESTIMONIALS: {
    LIST: `/api/testimonials/`,
    DETAIL: (id) => `/api/testimonials/${id}/`,
  },

  REGISTER_MSG: {
    LIST: `/api/register_msg/`, 
    DELETE: (id) => `/api/register_msg/${id}/`, 
  },

  ARTICLES: {
    LIST: `/api/articles/`,
    DETAIL: (id) => `/api/articles/${id}/`,
  },
};