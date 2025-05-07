import { Controller } from '@nestjs/common';
import { BehaviourJournalService } from './behaviour-journal.service';

@Controller('behaviour-journal')
export class BehaviourJournalController {
  constructor(private readonly behaviourJournalService: BehaviourJournalService) {}
}
