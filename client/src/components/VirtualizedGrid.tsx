import { memo, useMemo, useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemsPerPage?: number;
  className?: string;
  loadingComponent?: React.ReactNode;
}

function VirtualizedGrid<T>({
  items,
  renderItem,
  itemsPerPage = 12,
  className = '',
  loadingComponent
}: VirtualizedGridProps<T>) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: false,
  });

  const displayedItems = useMemo(() => {
    return items.slice(0, visibleItems);
  }, [items, visibleItems]);

  const hasMore = visibleItems < items.length;

  useEffect(() => {
    if (isIntersecting && hasMore) {
      setVisibleItems(prev => Math.min(prev + itemsPerPage, items.length));
    }
  }, [isIntersecting, hasMore, itemsPerPage, items.length]);

  return (
    <div className={className}>
      <div className="responsive-grid">
        {displayedItems.map((item, index) => (
          <div key={index} className="google-fade-in">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loadingComponent || (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading more...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(VirtualizedGrid) as typeof VirtualizedGrid;