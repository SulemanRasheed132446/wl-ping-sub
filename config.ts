export const NETWORK = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK || "mainnet";
export const CONTRACT_ADDRESS = "0x239eCdE3ae0e467111c898AAbB91b35d6B26f14F";
export const API_KEY =
  "<add necessary api key from any web3 provider (eg. alchemy, quicknode, infura, etc...)>";
export const INFURA_ID =
  process.env.NEXT_PUBLIC_INFURA_ID || "2ae8717688ef44c9ab60314664d1e23e";
export const ETHEREUM_URL =
  process.env.NEXT_PUBLIC_ETHEREUM_URL ||
  `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;


const subsABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "isActive", type: "bool" },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "CollectionUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "started",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "expires",
        type: "uint32",
      },
    ],
    name: "SubscriptionUpdate",
    type: "event",
  },
  {
    inputs: [],
    name: "ERC1155",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERC721",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes22", name: "", type: "bytes22" }],
    name: "collectionSettings",
    outputs: [
      { internalType: "uint256", name: "ethPrice", type: "uint256" },
      {
        internalType: "address payable",
        name: "royaltyReceiver",
        type: "address",
      },
      { internalType: "uint16", name: "royaltyNum", type: "uint16" },
      { internalType: "uint16", name: "royaltyDenom", type: "uint16" },
      { internalType: "uint32", name: "duration", type: "uint32" },
      { internalType: "uint16", name: "index", type: "uint16" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "address", name: "collectionAddress", type: "address" },
      { internalType: "uint8", name: "collectionType", type: "uint8" },
      { internalType: "uint8", name: "collectionId", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "collections",
    outputs: [{ internalType: "bytes22", name: "", type: "bytes22" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "isDelegate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "bool", name: "isDelegate_", type: "bool" },
    ],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptions",
    outputs: [
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint32", name: "created", type: "uint32" },
      { internalType: "uint32", name: "started", type: "uint32" },
      { internalType: "uint32", name: "expires", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "collection", type: "address" },
      { internalType: "uint16", name: "tokenId", type: "uint16" },
    ],
    name: "getCollectionKey",
    outputs: [{ internalType: "bytes22", name: "", type: "bytes22" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getSubscription",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "uint32", name: "created", type: "uint32" },
          { internalType: "uint32", name: "started", type: "uint32" },
          { internalType: "uint32", name: "expires", type: "uint32" },
        ],
        internalType: "struct WLPSubscriptions.Subscription",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "countCollections",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "count", type: "uint256" },
    ],
    name: "listCollections",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "ethPrice", type: "uint256" },
          {
            internalType: "address payable",
            name: "royaltyReceiver",
            type: "address",
          },
          { internalType: "uint16", name: "royaltyNum", type: "uint16" },
          { internalType: "uint16", name: "royaltyDenom", type: "uint16" },
          { internalType: "uint32", name: "duration", type: "uint32" },
          { internalType: "uint16", name: "index", type: "uint16" },
          { internalType: "bool", name: "isActive", type: "bool" },
          {
            internalType: "address",
            name: "collectionAddress",
            type: "address",
          },
          { internalType: "uint8", name: "collectionType", type: "uint8" },
          { internalType: "uint8", name: "collectionId", type: "uint8" },
        ],
        internalType: "struct WLPSubscriptions.CollectionSettings[]",
        name: "activeCollections",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "collection", type: "address" },
      { internalType: "uint16", name: "tokenId", type: "uint16" },
      { internalType: "uint16", name: "periods", type: "uint16" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32[]", name: "seconds_", type: "uint32[]" },
      { internalType: "address[]", name: "accounts", type: "address[]" },
    ],
    name: "gift",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "bool", name: "setExpired", type: "bool" },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "ethPrice", type: "uint256" },
          {
            internalType: "address payable",
            name: "royaltyReceiver",
            type: "address",
          },
          { internalType: "uint16", name: "royaltyNum", type: "uint16" },
          { internalType: "uint16", name: "royaltyDenom", type: "uint16" },
          { internalType: "uint32", name: "duration", type: "uint32" },
          { internalType: "uint16", name: "index", type: "uint16" },
          { internalType: "bool", name: "isActive", type: "bool" },
          {
            internalType: "address",
            name: "collectionAddress",
            type: "address",
          },
          { internalType: "uint8", name: "collectionType", type: "uint8" },
          { internalType: "uint8", name: "collectionId", type: "uint8" },
        ],
        internalType: "struct WLPSubscriptions.CollectionSettings",
        name: "newConfig",
        type: "tuple",
      },
    ],
    name: "setCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const CONFIG = {
  baseURI: "https://api.whitelistping.io",
  collectionAddress: "0x5e4Cd61E666d610392701934651bd90367984483",
  collectionToken: "0",
  contractAddress: "0x13af00D46B41C1B08DCAb5d93007D5D82810C701",
  contractABI: subsABI,
  infuraId: "9f57294117e34952877d794e30a0fdbe",
  network: "mainnet",
  sessionTimeout: 60 * 60,
};
