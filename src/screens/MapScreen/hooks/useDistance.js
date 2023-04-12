import {useState, useCallback} from 'react';
import getDistance from 'geolib/es/getPreciseDistance';

export const useDistance = () => {
  const [distance, setDistance] = useState(undefined);

  const calculateDistance = useCallback((p1, p2) => {
    setDistance(getDistance(p1, p2));
  }, []);

  return [distance, calculateDistance];
};
