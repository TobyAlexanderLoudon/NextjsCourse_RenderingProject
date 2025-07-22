import { notFound } from 'next/navigation';

import NewsList from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import Link from 'next/link';

export default async function ArchiveYearPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  const availableYears = await getAvailableNewsYears();
  const availableMonths = selectedYear
    ? getAvailableNewsMonths(selectedYear)
    : [];
  let links = availableYears;

  let news;
  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = availableMonths;
  }

  let newsContent = <p>No news found for the selected period</p>;
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !availableYears.includes(+selectedYear)) ||
    (selectedMonth && !availableMonths.includes(+selectedMonth))
  ) {
    throw new Error('Invalid Filter');
  }

  return (
    <>
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
      {newsContent}
    </>
  );
}
