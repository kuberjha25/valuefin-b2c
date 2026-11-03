'use client';

import { useEffect, useState } from 'react';

/** The current year. Starts with the year the page was built, then corrects itself in the browser. */
export function Year({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <span id="yr">{year}</span>;
}
