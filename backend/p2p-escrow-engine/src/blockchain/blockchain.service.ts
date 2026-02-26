import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  // In production, move this to your .env file!
  private readonly logger = new Logger(BlockchainService.name)
  private readonly masterMnemonic = 'your twelve word secret mnemonic phrase goes here';
  private readonly provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

  /**
   * Listens for a transaction on-chain for a specific address
   */
  async getTransactionCount(address: string): Promise<number> {
    return await this.provider.getTransactionCount(address);
  }


  
  /**
   * Generates a unique deposit address for a specific trade ID
   * @param tradeId The unique ID of the escrow transaction
   */
  generateDepositAddress(tradeId: number): string {
    try {
      // We use the tradeId as the "index" in the HD path
      // Path: m/44'/60'/0'/0/index
      const wallet = ethers.HDNodeWallet.fromPhrase(
        this.masterMnemonic,
        undefined,
        `m/44'/60'/0'/0/${tradeId}`,
      );
      return wallet.address;
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate deposit address');
    }
  }

  /**
   * Monitors the blockchain for a specific amount at an address
   */
  async checkAddressBalance(address: string): Promise<number> {
    const balance = await this.provider.getBalance(address);
    return parseFloat(ethers.formatEther(balance));
  }


  /**
   * Verify if the balance meets the required trade amount
   */
  async verifyDeposit(address: string, requiredAmount: number): Promise<boolean> {
    const balance = await this.checkAddressBalance(address);
    this.logger.log(`Checking address ${address}: Found ${balance} ETH/BNB`);
    return balance >= requiredAmount;
  }

}