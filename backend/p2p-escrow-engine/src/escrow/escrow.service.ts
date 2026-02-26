import { Injectable } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class EscrowService {
  constructor(private blockchainService: BlockchainService) {}

  async createEscrowTransaction(userId: string, amount: number) {
    // 1. Generate a dummy Trade ID (In reality, this comes from your DB)
    const tradeId = Math.floor(Math.random() * 1000000);

    // 2. Generate the unique address for this specific trade
    const depositAddress = this.blockchainService.generateDepositAddress(tradeId);

    // 3. Return the info to the user so they know where to send crypto
    return {
      tradeId,
      depositAddress,
      amountRequired: amount,
      status: 'AWAITING_DEPOSIT',
    };
  }
}