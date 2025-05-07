import { Module } from '@nestjs/common';
import { BehaviourJournalService } from './behaviour-journal.service';
import { BehaviourJournalController } from './behaviour-journal.controller';

@Module({
  controllers: [BehaviourJournalController],
  providers: [BehaviourJournalService],
})
export class BehaviourJournalModule {}
