/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */

// Mock dish records
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

// In-memory orders store
const mockOrders = [];

// Mock authenticated user session
const mockSessionUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
};

/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
}

/**
 * Create a new order in memory
 */
export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    userId: mockSessionUser.id,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}

/**
 * Retrieve a specific order by ID
 */
export async function getOrder(id) {
  const order = mockOrders.find((o) => o.id === id);
  return order || null;
}

/**
 * Mark an order as cancelled
 */
export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}

/**
 * Read current authenticated user session
 */
export async function getSession() {
  return mockSessionUser;
}

const orders = [
  { id: "AE-1001", customer: "Abebe", area: "Megenagna", total: 1200, date: "2026-10-01", status: "Delivered" },
  { id: "AE-1002", customer: "Hana", area: "Piassa", total: 2500, date: "2026-10-01", status: "Delivered" },
  { id: "AE-1003", customer: "Dawit", area: "Kazanchis", total: 1800, date: "2026-10-02", status: "Pending" },
  { id: "AE-1004", customer: "Sara", area: "Mexico", total: 900, date: "2026-10-02", status: "Delivered" },
  { id: "AE-1005", customer: "Mekdes", area: "Piassa", total: 3200, date: "2026-10-03", status: "Delivered" },
  { id: "AE-1006", customer: "Yonas", area: "Megenagna", total: 1600, date: "2026-10-03", status: "Pending" },
  { id: "AE-1007", customer: "Liya", area: "Kazanchis", total: 2100, date: "2026-10-04", status: "Delivered" },
  { id: "AE-1008", customer: "Samuel", area: "Mexico", total: 1300, date: "2026-10-04", status: "Cancelled" },
  { id: "AE-1009", customer: "Rahel", area: "Piassa", total: 2800, date: "2026-10-05", status: "Delivered" },
  { id: "AE-1010", customer: "Biruk", area: "Megenagna", total: 1900, date: "2026-10-05", status: "Delivered" },
  { id: "AE-1011", customer: "Mimi", area: "Kazanchis", total: 2400, date: "2026-10-06", status: "Delivered" },
  { id: "AE-1012", customer: "Nahom", area: "Mexico", total: 1100, date: "2026-10-06", status: "Pending" },
  { id: "AE-1013", customer: "Eden", area: "Piassa", total: 3500, date: "2026-10-07", status: "Delivered" },
  { id: "AE-1014", customer: "Dani", area: "Megenagna", total: 1400, date: "2026-10-07", status: "Delivered" },
  { id: "AE-1015", customer: "Marta", area: "Kazanchis", total: 1700, date: "2026-10-08", status: "Pending" },
  { id: "AE-1016", customer: "Kebede", area: "Mexico", total: 1500, date: "2026-10-08", status: "Delivered" },
  { id: "AE-1017", customer: "Selam", area: "Piassa", total: 2200, date: "2026-10-09", status: "Delivered" },
  { id: "AE-1018", customer: "Robel", area: "Megenagna", total: 2000, date: "2026-10-09", status: "Delivered" },
  { id: "AE-1019", customer: "Almaz", area: "Kazanchis", total: 2600, date: "2026-10-10", status: "Delivered" },
  { id: "AE-1020", customer: "Henok", area: "Mexico", total: 1000, date: "2026-10-10", status: "Cancelled" },
];

export async function getOrders() {
  return orders;
}