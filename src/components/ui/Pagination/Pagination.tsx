import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pgination.module.css';
import type { IPaginationProps } from './Pagination.types.ts';

export const Pagination: React.FC<IPaginationProps> = ({ pageCount, onPageChange, forcePage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next ›"
      previousLabel="‹ Prev"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      pageLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      previousClassName={styles.page}
      nextClassName={styles.page}
      disabledClassName={styles.disabled}
      breakClassName={styles.page}
      breakLinkClassName={styles.pageLink}
      forcePage={forcePage}
    />
  );
};
