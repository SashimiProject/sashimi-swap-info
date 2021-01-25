import React, { useMemo } from 'react'
import styled from 'styled-components'
import Panel from '../Panel'
import { AutoColumn } from '../Column'
import { RowFixed } from '../Row'
import { TYPE } from '../../Theme'
import { usePairData } from '../../contexts/PairData'
import { formattedNum } from '../../utils'

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
  const husdPair = usePairData('0x24c9e69780e9d7205d40085fce5188c37d54b4f7')

  const totalLiquidity = useMemo(() => {
    return husdPair
      ? husdPair.trackedReserveUSD
      : 0
  }, [husdPair])

  const husdPerEth = husdPair ? parseFloat(husdPair.token0Price).toFixed(2) : '-'
  return (
    <PriceCard>
      <AutoColumn gap="10px">
        <RowFixed>
          <TYPE.main>HUSD/HT: {formattedNum(husdPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {husdPair && totalLiquidity ? formatPercent(husdPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
      </AutoColumn>
    </PriceCard>
  )
}
