import type { ProjectShared } from '../types';

export const oncallAutomationShared: ProjectShared = {
  slug: 'oncall-automation',
  status: 'done',
  stack: [
    'n8n',
    'Slack Workflow',
    'LLM',
    'Jira API',
    'Slack API',
    'OpsGenie API',
    'New Relic API',
  ],
};
