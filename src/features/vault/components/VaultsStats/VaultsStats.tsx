import React from 'react';
import moment from 'moment';
import { Box, Divider, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { isGovVault, VaultEntity } from '../../../data/entities/vault';
import { selectVaultById } from '../../../data/selectors/vaults';
import { DailyApyStats, YearlyApyStats } from '../../../../components/ApyStats';
import { ValueBlock } from '../../../../components/ValueBlock/ValueBlock';
import { VaultTvl } from '../../../../components/VaultTvl/VaultTvl';
import { VaultDeposited } from '../../../../components/VaultDeposited/VaultDeposited';
import { GovVaultRewards } from '../../../../components/GovVaultRewards/GovVaultRewards';
import { getBeefyApi } from '../../../data/apis/instances';
import { useAppSelector } from '../../../../store';

const useStyles = makeStyles(styles);

function VaultsStatsComponent({ vaultId }: { vaultId: VaultEntity['id'] }) {
  const lastHarvestStr = useLastHarvestStr(vaultId);
  const classes = useStyles();
  const { t } = useTranslation();
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  return (
    <div className={classes.container}>
      <div className={classes.userStats}>
        <Box className={classes.userStatsBox}>
          <Box width={'33%'} className={classes.stat3}>
            <VaultTvl vaultId={vaultId} />
          </Box>
          <Box className={classes.stat}>
            <Divider className={classes.divider} orientation="vertical" />
            <Box className={classes.stat3}>
              <YearlyApyStats vaultId={vault.id} />
            </Box>
          </Box>
          <Box display="flex">
            <Divider className={classes.divider} orientation="vertical" />
            <Box className={classes.stat3}>
              <DailyApyStats vaultId={vault.id} />
            </Box>
          </Box>
        </Box>
      </div>
      <div className={classes.beefyStats}>
        <Grid container className={classes.beefyStatsBox}>
          <Grid item xs={6} className={classes.stat1}>
            <Box className={classes.stat4}>
              <VaultDeposited vaultId={vaultId} />
            </Box>
          </Grid>
          {(isGovVault(vault) || lastHarvestStr !== 'never') && (
            <Divider flexItem={true} className={classes.divider1} orientation="vertical" />
          )}
          {!isGovVault(vault) ? (
            <>
              {lastHarvestStr !== 'never' && (
                <Grid item xs={6}>
                  <Box className={classes.stat4}>
                    <ValueBlock label={t('Vault-LastHarvest')} value={lastHarvestStr} />
                  </Box>
                </Grid>
              )}
            </>
          ) : (
            <Grid item xs={6}>
              <Box className={classes.stat4}>
                <GovVaultRewards vaultId={vaultId} />
              </Box>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export const VaultsStats = React.memo(VaultsStatsComponent);

const useLastHarvestStr = (vaultId: string) => {
  const [state, setState] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const beefyApi = getBeefyApi();
      const lastHarvest = await beefyApi.getVaultLastHarvest(vaultId);

      if (lastHarvest === null) {
        setState('never');
      } else {
        const lhStr = moment(lastHarvest)
          .fromNow()
          .replace(' hours', 'h')
          .replace(' minutes', 'm')
          .replace(' days', 'd');

        setState(lhStr);
      }
    })();
  }, [vaultId]);

  return state;
};
