import { notFound } from 'next/navigation';

import { getNewsItem } from '@/lib/news';
import ModalBackdrop from '@/components/modal-backdrop';

export default async function InterceptedImagePage({ params }) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />

      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
