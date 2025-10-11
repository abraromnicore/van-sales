import { createContext, useContext, useMemo } from 'react';
import { buildAbilityFromNestedPermissions } from '@/utils/permissionsToCasl';

const AbilityContext = createContext(null);

export const AbilityProvider = ({ permissions, children }) => {
  const ability = useMemo(() => buildAbilityFromNestedPermissions(permissions), [permissions]);
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

export const useAbility = () => useContext(AbilityContext);