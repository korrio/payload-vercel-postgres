import * as migration_20250522_154829_initial from './20250522_154829_initial';
import * as migration_20250716_074409_add_user_email_role_columns_only from './20250716_074409_add_user_email_role_columns_only';

export const migrations = [
  {
    up: migration_20250522_154829_initial.up,
    down: migration_20250522_154829_initial.down,
    name: '20250522_154829_initial',
  },
  {
    up: migration_20250716_074409_add_user_email_role_columns_only.up,
    down: migration_20250716_074409_add_user_email_role_columns_only.down,
    name: '20250716_074409_add_user_email_role_columns_only'
  },
];
