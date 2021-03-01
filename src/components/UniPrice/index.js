import React, { useMemo } from 'react'
import styled from 'styled-components'
import Panel from '../Panel'
import { AutoColumn } from '../Column'
import { RowFixed } from '../Row'
import { TYPE } from '../../Theme'
import { usePairData } from '../../contexts/PairData'
import { formattedNum } from '../../utils'
import { NATIVE_TOKEN_SYMBOL } from '../../constants'

const PriceCard = styled(Panel)`
  position: absolute;
  right: -220px;
  width: 220px;
  top: -20px;
  z-index: 9999;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg1};
`

function formatPercent(rawPercent) {
  if (rawPercent < 0.01) {
    return '<1%'
  } else return parseFloat(rawPercent * 100).toFixed(0) + '%'
}

// TODO: sashimi pair address
export default function UniPrice() {
  // todo: 修改稳定币与WETH pair的地址, 注意pair中token的顺序，注意小写
  const stablePair = usePairData(process.env.REACT_APP_STABLE_NATIVE_PAIR_ADDRESS)

  const totalLiquidity = useMemo(() => {
    return stablePair
      ? stablePair.trackedReserveUSD
      : 0
  }, [stablePair])

  const usdPerEth = stablePair ? parseFloat(stablePair[`token${process.env.REACT_APP_STABLE_NATIVE_PAIR_STABLE_INDEX}Price`]).toFixed(2) : '-'
  return (
    <PriceCard>
      <AutoColumn gap="10px">
        <RowFixed>
          <TYPE.main>{stablePair[`token${process.env.REACT_APP_STABLE_NATIVE_PAIR_STABLE_INDEX}`].symbol}/{NATIVE_TOKEN_SYMBOL}: {formattedNum(usdPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {stablePair && totalLiquidity ? formatPercent(stablePair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
      </AutoColumn>
    </PriceCard>
  )
}
