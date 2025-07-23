import { Suspense } from 'react';
import MealsGrid from '../../components/meals/meals-grid';
import { getMeals } from '../../lib/meals';
import classes from './page.module.css';
import Link from 'next/link';

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourelf. It's easy and fun
        </p>
        <p className={classes.cta}>
          <Link href={'/meals/share'}>Share your favourite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
