import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '@/store/store.ts';
import { useEffect } from 'react';
import styled from 'styled-components';

const BreadcrumbsContainer = styled.div`
    display: flex;
    align-items: center;

    ol {
        display: flex;
        align-items: center;
        gap: 8px;
        
        li {
            display: flex;
            gap: 8px;

            a {
                color: #17609E;
            }

            .label,
            .active {
                color: #979797;
            }
            
            &:has(.label) {
                
                .separator {
                    color: #979797;
                }
                
            }
            
            &:has(a) {
                
                .separator {
                    color: #17609E;
                }
                
            }
            
        }
        
    }

`;

export const Breadcrumbs: React.FC = () => {
  const { pageTitle, breadcrumbs } = useSelector((state: RootState) => state.metadata);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle, breadcrumbs]);

  if ((breadcrumbs && breadcrumbs.length === 0) || !breadcrumbs) return null;

  return (
    <BreadcrumbsContainer>
      <ol>
        {breadcrumbs.map((crumb, index) => {
          return (
            <li key={index} className="inline-flex items-center">
              {index !== 0 && <span className="separator">/</span>}
              {crumb.active ? (
                <span className="active">{crumb.label}</span>
              ) : crumb.route ? (
                <Link
                  to={crumb.route}
                  className="route"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="label">{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </BreadcrumbsContainer>
  );
};