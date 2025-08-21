import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ARRAY_LENGTH = 10;

const TableSkeleton = () => {
  return (
    <ul style={{ width: '100%' }}>
      {Array(ARRAY_LENGTH)
        .fill(0)
        .map((_, idx) => (
          <li key={idx} style={{ width: '100%', height: '3rem', marginBottom: '1rem' }}>
            <Skeleton
              height="100%"
              width="100%"
              baseColor="#c0c0c0"
              highlightColor="#e0e0e0"
              style={{ marginBottom: '8px' }}
            />
          </li>
        ))}
    </ul>
  );
};

export default TableSkeleton;
