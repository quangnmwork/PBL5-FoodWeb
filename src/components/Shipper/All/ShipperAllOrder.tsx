import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { shipperAPI } from '../../../api/repositoryFactory';
import ShipperOrderList from './ShipperOrderList';
import './../pagnitation..css';
function isNumeric(num: any) {
  return !isNaN(num);
}
const ShipperAllOrder = () => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    let mounted = true;
    shipperAPI.getTotalPageAllShip().then((res) => {
      if (mounted) setTotalPage(res.data);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const goToPage = (isIncrease: boolean) => {
    if (isIncrease) {
      if (currentPage > totalPage && totalPage > 0) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else setCurrentPage(1);
    } else {
      if (currentPage == 1 && totalPage > 0) {
        setCurrentPage(totalPage);
      } else {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    }
  };
  const pageOnClick = (event: any) => {
    if (isNumeric(parseInt(event.event.target.textContent))) {
      setCurrentPage(parseInt(event.event.target.textContent));
    } else {
      if (event.event.target.textContent == '>') goToPage(true);
      else goToPage(false);
    }
  };
  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      <ShipperOrderList pageNumber={currentPage} />
      {totalPage > 0 ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <IconButton
              variant="outline"
              colorScheme="main"
              aria-label="next"
              fontSize={'1.2rem'}
              icon={<ChevronRightIcon />}
            />
          }
          previousLabel={
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="prev"
              fontSize={'1.2rem'}
              icon={<ChevronLeftIcon />}
            />
          }
          pageCount={totalPage || 1}
          containerClassName={'container'}
          pageLinkClassName={'page-link'}
          activeLinkClassName="page-link-active"
          onClick={pageOnClick}
        />
      ) : null}
    </Stack>
  );
};

export default ShipperAllOrder;
