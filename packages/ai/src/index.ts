// Client
export { getAnthropicClient, resetAnthropicClient } from './client';

// Chatbot
export {
  handleChatMessage,
  type ChatIntent,
  type ChatResponse,
  type Message,
} from './chatbot';

// Quote Generator
export {
  generateQuoteDraft,
  type QuoteItem,
  type QuoteRequest,
  type QuoteDraft,
} from './quote-generator';

// Proposal Drafter
export {
  draftProposal,
  type CompanyProfile,
  type OpportunityData,
  type ProposalDraft,
} from './proposal-drafter';

// Document Processor
export {
  processDocument,
  type ExtractedData,
  type LineItem,
} from './document-processor';

// Opportunity Matcher
export {
  scoreOpportunity,
  type RawOpportunity,
  type OpportunityScore,
  type ScoreBreakdown,
  type RecommendedAction,
} from './opportunity-matcher';
