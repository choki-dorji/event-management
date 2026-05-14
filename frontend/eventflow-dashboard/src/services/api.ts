import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


// AUTH APIs
export const authApi = {

  register: (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) =>
    api.post("/auth/register", data),

  login: (data: {
    email: string;
    password: string;
  }) =>
    api.post("/auth/login", data),

  profile: () =>
    api.get("/auth/profile"),

  updateProfile: (data: {
    name: string;
    email: string;
  }) =>
    api.put("/auth/profile", data),

  changePassword: (data: {
    oldPassword: string;
    newPassword: string;
  }) =>
    api.put("/auth/change-password", data),
};


// EVENTS APIs
export const eventsApi = {

  list: () =>
    api.get("/events"),

  myEvents: () =>
  api.get("/events/my-events"),
  get: (id: string) =>
    api.get(`/events/${id}`),

  create: (data: FormData) =>
  api.post(
    "/events",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  ),

  update: (
  id: string,
  data: FormData
) =>
  api.put(
    `/events/${id}`,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  ),

  remove: (id: string) =>
    api.delete(`/events/${id}`),
};


// REGISTRATIONS APIs
export const registrationsApi = {

  register: (data: {
    eventId: string;
  }) =>
    api.post("/registrations", data),

  myEvents: () =>
    api.get("/registrations/my-events"),
  all: () =>
  api.get("/registrations/all"),
};


// ATTENDANCE APIs
export const attendanceApi = {

  mark: (data: {
    registrationId: string;
  }) =>
    api.post("/attendance/mark", data),

  forEvent: (eventId: string) =>
    api.get(
      `/attendance/event/${eventId}`
    ),
};


// DASHBOARD APIs
export const dashboardApi = {

  stats: () =>
    api.get("/dashboard/stats"),
};


// ANNOUNCEMENTS APIs
export const announcementsApi = {

  list: () =>
    api.get("/announcements"),

  create: (data: any) =>
    api.post("/announcements", data),
};


export default api;