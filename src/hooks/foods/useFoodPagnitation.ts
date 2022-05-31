import { useEffect, useState } from 'react';
import axiosClient from '../../api/repository';

const useFoodPagnitation = (
  url: string,
  keyName: string,
  category?: string
) => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const currentCategory = category || '';
  const objSearch: Partial<{ keyName: string; nameCategory: string }> = {
    keyName: keyName,
    nameCategory: ''
  };
  if (currentCategory.length) {
    objSearch.nameCategory = currentCategory;
  } else {
    delete objSearch.nameCategory;
  }
  useEffect(() => {
    setPageLoading(true);

    let mounted = true;
    if (mounted) {
      axiosClient
        .get(url, { params: objSearch })
        .then((res) => {
          setTotalPage(res.data);
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return {
    pageLoading,
    totalPage
  };
};
export default useFoodPagnitation;
