import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

// TODO: sashimi subgraph
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/sashimiproject/sashimi'
  }),
  cache: new InMemoryCache(),
  shouldBatch: true
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql'
  }),
  cache: new InMemoryCache(),
  shouldBatch: true
})

export const v1Client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap'
  }),
  cache: new InMemoryCache(),
  shouldBatch: true
})

export const blockClient = new ApolloClient({
  // todo: 更改为kovan或者主网链接
  link: new HttpLink({
    // 主网链接
    uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks'
    // kovan链接
    // uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/kovan-blocks'
  }),
  cache: new InMemoryCache()
})
