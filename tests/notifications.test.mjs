import assert from "node:assert/strict";
import test from "node:test";
import { filterNotifications, notifications, isNotificationUnread } from "../lib/notifications.ts";

test("read and unread filters partition every notification", () => {
  const unread = filterNotifications("unread", []);
  const read = filterNotifications("read", []);
  assert.equal(unread.length, 3);
  assert.equal(new Set([...unread, ...read].map((item) => item.id)).size, notifications.length);
  assert.ok(unread.every((item) => !read.includes(item)));
});

test("marking selected notifications read leaves the others unread", () => {
  const selected = ["flight-delay", "booking-confirmed"];
  assert.deepEqual(filterNotifications("unread", selected).map((item) => item.id), ["gate-change"]);
  assert.ok(filterNotifications("read", selected).some((item) => item.id === "booking-confirmed"));
  assert.equal(isNotificationUnread(notifications[0], selected), false);
});

test("mark all read clears unread count without removing notifications", () => {
  const readIds = notifications.map((item) => item.id);
  assert.equal(filterNotifications("unread", readIds).length, 0);
  assert.equal(filterNotifications("read", readIds).length, notifications.length);
  assert.equal(filterNotifications("all", readIds).length, 4);
});

test("category filters remain independent of read state", () => {
  for (const category of ["flights", "bookings", "offers", "occasions"]) {
    const items = filterNotifications(category, notifications.map((item) => item.id));
    assert.ok(items.length > 0);
    assert.ok(items.every((item) => item.category === category));
  }
});
