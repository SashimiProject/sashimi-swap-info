import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

// TODO: sashimi subgraph
export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_URL_PREFIX}/subgraphs/name/${process.env.REACT_APP_GRAPHQL_SWAP_NAME}`
  }),
  cache: new InMemoryCache(),
  shouldBatch: true
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_URL_PREFIX}/index-node/graphql`
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
    uri: `https://api.bscgraph.org/subgraphs/name/bsc-blocks`
  }),
  cache: new InMemoryCache()
})
