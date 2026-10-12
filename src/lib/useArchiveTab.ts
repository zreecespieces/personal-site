"use client";

import { useSyncExternalStore } from "react";

const changeEvent = "archive-tab-change";
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

function subscribe(notify: () => void) {
  window.addEventListener("popstate", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener(changeEvent, notify);
  };
}

export function useArchiveTab(parameter: string, values: readonly string[]) {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const requested = new URLSearchParams(search).get(parameter);
  const selected = requested !== null && values.includes(requested) ? requested : (values[0] ?? "");

  function select(value: string) {
    if (!values.includes(value)) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get(parameter) === value) return;
    url.searchParams.set(parameter, value);
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(changeEvent));
  }

  return [selected, select] as const;
}
