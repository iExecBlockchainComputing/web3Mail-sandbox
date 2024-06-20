const IEXEC_CHAIN_ID = '0x86'; // 134

export function checkIsConnected() {
  if (!window.ethereum) {
    console.log('Please install MetaMask');
    throw new Error('No Ethereum provider found');
  }
}

export async function checkCurrentChain() {
  const currentChainId = await window.ethereum.request({
    method: 'eth_chainId',
    params: [],
  });
  if (currentChainId !== IEXEC_CHAIN_ID) {
    console.log('Please switch to iExec chain');
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: IEXEC_CHAIN_ID,
          },
        ],
      });
      console.log('Switched to iExec chain');
    } catch (err) {
      console.error('Failed to switch to iExec chain:', err);
      throw err;
    }
  }
}
