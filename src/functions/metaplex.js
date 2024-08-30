import { Metaplex, walletAdapterIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Connection } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

const useMetaplex = () => {
    const { wallet } = useWallet();

    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))

    return metaplex;
};

export default useMetaplex;
