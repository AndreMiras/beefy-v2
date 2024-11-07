import type { MigrationConfig } from '../../features/data/reducers/wallet/migration';

export const migrators = [
  {
    id: 'real-pearl',
    name: 'Pearl',
    icon: 'PEARL',
  },
] as const satisfies ReadonlyArray<MigrationConfig>;
