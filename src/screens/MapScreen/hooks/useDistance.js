import {useState, useCallback} from 'react';
import getDistance from 'geolib/es/getPreciseDistance';

export const useDistance = () => {
  const [distance, setDistance] = useState(undefined);

  const calculateDistance = useCallback((p1, p2) => {
    setDistance(
      getDistance(
        {
          latitude: parseFloat(p1.latitude),
          longitude: parseFloat(p1.longitude),
        },
        {
          latitude: parseFloat(p2.latitude),
          longitude: parseFloat(p2.longitude),
        },
      ),
    );
  }, []);

  return [distance, calculateDistance];
};
