import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '@/store/store.ts';
import { useEffect } from 'react';

export const Breadcrumbs: React.FC = () => {
  const { pageTitle, breadcrumbs } = useSelector((state: RootState) => state.metadata);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle, breadcrumbs]);

  if (!breadcrumbs.length) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              {index !== 0 && <span className="mx-1 text-gray-400">/</span>}
              {isLast ? (
                <span className="text-gray-500 ml-1 md:ml-2">{crumb.label}</span>
              ) : crumb.route ? (
                <Link
                  to={crumb.route}
                  className="text-gray-700 hover:text-blue-600 inline-flex items-center"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-700">{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};