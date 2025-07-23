import Link from 'next/link';
import { Suspense } from 'react';

import NewsList from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';

async function FilteredNews({ selectedYear, selectedMonth }) {
  let news;

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
  }

  let newsContent = <p>No news found for the selected period</p>;
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

async function FilteredHeader({ selectedYear, selectedMonth }) {
  const availableYears = await getAvailableNewsYears();
  const availableMonths = getAvailableNewsMonths(selectedYear);
  let links = selectedYear ? availableMonths : availableYears;

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !availableMonths.includes(selectedMonth))
  ) {
    throw new Error('Invalid Filter');
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = selectedYear
              ? `/archive/${selectedYear}/${link}`
              : `/archive/${link}`;

            return (
              <Link href={href} key={link}>
                {link}
              </Link>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default async function ArchiveYearPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filters...</p>}>
        <FilteredHeader
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      </Suspense>
    </>
  );
}
