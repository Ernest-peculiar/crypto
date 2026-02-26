import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EscrowModule } from './escrow/escrow.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { DisputeModule } from './dispute/dispute.module';

@Module({
  imports: [AuthModule, UsersModule, EscrowModule, BlockchainModule, DisputeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
