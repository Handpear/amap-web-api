import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { HawkEyeProps } from '.';
import { useVisible } from '../utils';

interface UseHawkEye extends HawkEyeProps {}

export function useHawkEye(props: UseHawkEye) {
  const { visible = true, offset = [0, 0], ...rest } = props;
  const { AMap, map } = useMapContext();
  const [hawkEye, setHawkEye] = useState<AMap.HawkEye>();

  useEffect(() => {
    if (AMap && map && !hawkEye) {
      hawkEye && map.removeControl(hawkEye);
      AMap.plugin(['AMap.HawkEye'], () => {
        const instance = new AMap.HawkEye({ ...rest, offset });
        map.addControl(instance);
        setHawkEye(instance);
      });
    }
    return () => {
      if (hawkEye) {
        map?.removeControl(hawkEye);
        setHawkEye(undefined);
      }
    };
  }, [map, hawkEye, JSON.stringify(offset), JSON.stringify(rest.mapStyle)]);

  useVisible(hawkEye!, visible);

  return {
    hawkEye,
    setHawkEye,
  };
}
