const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

class SolanaUtils {
    constructor(endpoint = 'https://api.devnet.solana.com') {
        this.connection = new Connection(endpoint);
    }

    async getAccountBalance(address) {
        try {
            const pubkey = new PublicKey(address);
            const balance = await this.connection.getBalance(pubkey);
            return balance / 1e9; // Convert to SOL
        } catch (error) {
            console.error('Failed to get balance:', error);
            throw error;
        }
    }

    async getTokenBalance(tokenAccount) {
        try {
            const account = new PublicKey(tokenAccount);
            const balance = await this.connection.getTokenAccountBalance(account);
            return balance.value;
        } catch (error) {
            console.error('Failed to get token balance:', error);
            throw error;
        }
    }

    async createTokenAccount(mint, owner) {
        try {
            const token = new Token(
                this.connection,
                new PublicKey(mint),
                TOKEN_PROGRAM_ID,
                owner
            );

            const account = await token.createAccount(owner);
            return account.toBase58();
        } catch (error) {
            console.error('Failed to create token account:', error);
            throw error;
        }
    }

    async signAndSendTransaction(transaction, signers) {
        try {
            transaction.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
            transaction.sign(...signers);
            
            const signature = await this.connection.sendRawTransaction(
                transaction.serialize()
            );
            
            await this.connection.confirmTransaction(signature);
            return signature;
        } catch (error) {
            console.error('Failed to send transaction:', error);
            throw error;
        }
    }
}

module.exports = SolanaUtils;