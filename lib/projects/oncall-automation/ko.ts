import type { Project } from "../types";
import { oncallAutomationShared } from "./shared";

export const oncallAutomationKo: Project = {
  ...oncallAutomationShared,
  title: "FE Oncall 프로세스 자동화 — LLM 기반 리포팅",
  period: "2025년 10월",
  role: "비효율 식별, 자동화 설계·구현, 팀 도입 주도",
  summary:
    "여러 플랫폼에 흩어져 있던 oncall 업무를 하나의 Jira 보드로 통합하고, 종료 리포트 작성을 자동화. 리포트 작성 시간을 기존의 약 1/3 수준으로 줄였고, oncall engineer가 할당된 이슈에 집중할 수 있는 환경을 만듦.",
  background: {
    content: [
      'FE oncall 업무는 접수, 리포트, 인수인계 전반에 비효율이 조용히 누적되어 있는 상태였음. 비효율을 해결하기보다 매번 수동으로 처리하며 일해 옴."',
    ],
  },
  problem: {
    content: [
      "**분산된 버그 접수:** oncall engineer가 Shakebug과 Slack을 따로 모니터링하면서, 팀 관련 버그를 매번 수동으로 골라내야 했음.",
      "**수기 인수인계 리포트:** 종료 리포트 작성을 위해 New Relic, OpsGenie, Shakebug, Slack 등을 일일이 확인하고 요약을 직접 작성해야 했음.",
      "**허술한 미해결 업무 인계:** 이전 oncall engineer가 미완료 업무 리스트를 직접 작성해 다음 차례에 넘겼음. 항목 누락이 잦았고, 빠진 항목은 누구도 인지하지 못한 채 몇 달간 방치되기도 했음.",
    ],
  },
  keyDecisions: [
    {
      title: "버그 접수를 단일 Jira 보드로 통합",
      description: [
        "두 가지 입력 경로를 각자에게 맞는 도구로 처리해 단일 Jira 보드로 통합. Shakebug에 리포트되는 버그는 공용 Slack 채널을 거쳐 n8n 워크플로우가 태그 필터링으로 팀 관련 버그만 추려 Jira 티켓으로 자동 생성. 팀 Slack 채널에 리포트되는 버그는 Slack 워크플로우의 구조화된 폼으로 받아 Jira 티켓으로 자동 생성.",
        "원본 Shakebug 링크와 Slack 스레드 링크를 Jira 티켓에 보존해 컨텍스트 유지. oncall engineer는 Jira 보드 한 곳만 모니터링 가능해짐.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/oncall-automation/ko/consolidation.svg",
          alt: "Before와 After 비교: Shakebug과 Slack에서 분산되어 들어오던 버그 접수를 단일 Jira 보드로 통합",
        },
      ],
    },
    {
      title: "두 플랫폼 티켓 동시 종료 누락 방지",
      description: [
        "Jira로 버그 트래킹이 옮겨간 뒤에는 Jira 티켓을 닫을 때 해당 Shakebug 티켓도 함께 닫아야 했음. 하지만 Shakebug API에는 'close ticket' 엔드포인트가 없어서 직접 동기화는 불가능했음.",
        "**설계 결정:** Shakebug 티켓 종료 작업을 엔지니어 기억에만 의존하게 두지 않고 명시적으로 노출. Jira 티켓이 닫히면 자동 Slack 메시지가 종료자를 태깅해 Shakebug 티켓도 닫도록 알림.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/oncall-automation/close-ticket-notice.png",
          alt: "Jira 티켓 종료 시 Shakebug 티켓도 닫도록 안내하는 Slack 알림",
          caption: "Jira 티켓이 닫히면 자동으로 발송되는 Slack 알림",
        },
      ],
    },
    {
      title: "LLM 기반 인수인계 리포트와 미해결 업무 자동 reassign",
      description: [
        "n8n 워크플로우가 여러 플랫폼에서 자동으로 데이터를 가져와 종료 리포트를 생성.",
        "New Relic: 페이지별 SLI를 LLM이 분석해 읽기 좋은 리스트로 포맷팅.",
        'Jira: 한 주의 티켓을 "Open"과 "Closed"로 분류하고 LLM으로 각 티켓을 요약.',
        "OpsGenie: 한 주 동안 가장 자주 발생한 알림 Top 10 추출.",
        "미해결 Jira 티켓은 자동으로 다음 oncall engineer에게 reassign — 항목 누락의 원인이었던 수동 리스트 작성 단계 자체를 없앰.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/oncall-automation/ko/report-flow.svg",
          alt: "종료 리포트 자동 플로우: 4개 플랫폼이 n8n과 LLM으로 모여 Slack 리포트 생성 및 티켓 자동 reassign",
        },
        {
          type: "image",
          src: "/projects/oncall-automation/weekly-report.png",
          alt: "자동 생성된 주간 인수인계 리포트: Top 알림, SLI, 티켓 요약 포함",
          caption: "Slack에 자동 생성되어 게시되는 종료 리포트",
        },
      ],
    },
  ],
  result: {
    content: [
      "**시간 절감:** 리포트 작성 시간을 약 1/3 수준으로 단축 (~67% 감소).",
      "**집중도 향상:** oncall engineer가 단일 보드에서 할당된 티켓만 관리. 더 이상 Shakebug, Slack을 오가며 플랫폼별로 모니터링하고 팀 관련 버그 수동으로 필터링할 필요 X.",
      "**누락 업무 X:** 모든 미해결 티켓이 시스템에서 자동 추적되고 oncall 종료 시 다음 담당자에게 자동 reassign — 불안정한 수동 리스트 완전히 대체.",
      "**다른 팀 도입:** 버그 라우팅 컨셉이 QA 팀의 관심을 끔. QA 팀이 n8n 워크플로우로 유사한 버전을 직접 구축 — 공용 Slack 채널의 태그 필터링된 버그를 팀별 채널로 라우팅하면서, 원본 스레드 링크를 보존해서 oncall engineer가 신고자와 빠르게 이어서 대화할 수 있도록 설계.",
    ],
  },
};
