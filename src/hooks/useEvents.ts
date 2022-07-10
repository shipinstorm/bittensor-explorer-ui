import { useCallback, useEffect, useMemo, useState } from "react";
import { FetchOptions } from "../model/fetchOptions";

import {
  EventsFilter,
  EventsOrder,
  getEvents,
} from "../services/eventsService";

import { usePagination } from "./usePagination";

export function useEvents(
  filter: EventsFilter,
  order?: EventsOrder,
  options?: FetchOptions
) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const pagination = usePagination();

  const fetchItems = useCallback(async () => {
    if (options?.skip) {
      return;
    }

    const events = await getEvents(
      pagination.limit,
      pagination.offset,
      filter,
      order
    );

    const nextExtrinsics = await getEvents(
      pagination.limit,
      pagination.offset + pagination.limit,
      filter,
      order
    );

    setLoading(false);
    setItems(events);
    pagination.setHasNext(nextExtrinsics.length > 0);
  }, [
    JSON.stringify(filter),
    JSON.stringify(order),
    pagination.limit,
    pagination.offset,
    options?.skip,
  ]);

  useEffect(() => {
    console.log("tatata");
    setLoading(true);
    fetchItems();
  }, [fetchItems]);

  return useMemo(
    () => ({
      items,
      loading,
      refetch: fetchItems,
      pagination,
    }),
    [items, loading, fetchItems, pagination]
  );
}
