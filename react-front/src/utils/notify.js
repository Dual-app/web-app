// src/utils/notify.js

/**
 * Dispatches a custom notification event that AdminTop.jsx listens to.
 * Usage:
 *   notify("schedule", "New Schedule Added", "Lawyer Noe added.", "/admin/schedules");
 */
export function notify(type, title, message, href) {
  window.dispatchEvent(
    new CustomEvent("app:new-notification", {
      detail: { type, title, message, href },
    })
  );
}
