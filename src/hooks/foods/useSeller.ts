import { useEffect, useState } from 'react';
import { userAPI } from '../../api/repositoryFactory';

import { Seller } from '../../models/User.model';

const useSeller = (keyName: string, pageNumber: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    setSellers([]);
  }, [keyName]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let fetch = true;
    userAPI.getAllSellerBySearch(keyName, pageNumber).then((res) => {
      if (fetch) {
        setSellers((prevSellers) => {
          // console.log([...new Set([...prevSellers, ...res.data])]);
          return [...new Set([...prevSellers, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      }
    });
    return () => {
      fetch = false;
    };
  }, [pageNumber, keyName]);
  return { loading, error, sellers, hasMore };
};

export default useSeller;
