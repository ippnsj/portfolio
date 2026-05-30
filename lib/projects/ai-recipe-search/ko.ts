import type { Project } from "../types";
import { aiRecipeSearchShared } from "./shared";

export const aiRecipeSearchKo: Project = {
  ...aiRecipeSearchShared,
  title: "AI 기반 레시피 검색 및 재료 일괄 검색 기능",
  period: "2025년 10월",
  role: "UX 개선점 식별, 기획·설계·구현, 내부 데모 진행",
  summary:
    "레시피를 찾으러 외부 앱으로 나갔다가 자사 앱으로 돌아와 재료를 하나씩 검색해야 했던 사용자 흐름을, 단일 인앱 플로우(레시피 검색 → 재료 자동 추출 → 멀티 검색 진입)로 통합한 PoC. 자발적으로 기획·설계·구현하고 내부 데모까지 진행함.",
  background: {
    content: [
      "Grocery 사용자 흐름 중 레시피를 먼저 정한 후 재료를 사러 오는 흐름이 있음을 파악. 자사 앱에는 멀티 검색 기능이 이미 있었지만, 이 흐름에 자연스럽게 연결되지 않았음.",
    ],
  },
  problem: {
    content: [
      "사용자가 외부 앱에서 레시피를 찾은 후 자사 앱으로 돌아와 재료를 하나씩 직접 검색해 넣어야 했음. 재료마다 복사·붙여넣기를 반복하고, 뭘 담았는지 어디까지 진행했는지도 사용자가 직접 챙겨야 했음.",
      "이런 비효율은 당연하게 받아들여지고 있었지만, 매 왕복마다 사용자가 구매 흐름에서 이탈할 위험이 있었음.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/ai-recipe-search/ko/before-after-flow.svg",
        alt: "기존 흐름과 개선 흐름 비교: 외부 앱 왕복 → 자사 앱 단일 플로우",
      },
    ],
  },
  keyDecisions: [
    {
      title: "비용 효율적인 LLM 활용 설계",
      description: [
        "모든 처리를 LLM에 맡기지 않고 작업별로 도구를 분리: 레시피 정보 생성은 LLM의 구조화 응답 능력 활용(재료·분량·조리법을 JSON으로 출력), 레시피 이미지는 비용이 큰 LLM 이미지 생성 대신 Google Custom Search API로 처리.",
        "PoC 비용과 응답 시간을 줄이면서도 AI 기반 사용자 경험은 그대로 유지.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/ai-recipe-search/ko/architecture.svg",
          alt: "아키텍처 다이어그램: n8n이 LLM(레시피 데이터)과 Google Search(이미지) API 호출을 자동화",
        },
      ],
    },
    {
      title: "자동 담기 대신 멀티 검색 진입 방식 채택",
      description: [
        "추출된 재료를 장바구니에 바로 담지 않고, 멀티 검색 페이지로 자동 진입하도록 설계. 자동 담기는 사용자가 원하는 브랜드·옵션 선택권을 빼앗는데, 사용자는 결국 상품 단위 결정은 직접 하고 싶어 함.",
        "멀티 검색은 자동화 편의성(수동 검색 X)을 살리면서 사용자의 선택권은 그대로 보장.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/ai-recipe-search/ko/auto-cart-vs-multi-search.svg",
          alt: "자동 담기와 멀티 검색 진입 비교: 멀티 검색이 사용자 선택권을 보장",
        },
      ],
    },
  ],
  result: {
    content: [
      "팀 호평: 프로덕트·디자인 팀의 긍정적 피드백으로 ML 팀과 협업 미팅까지 진행.",
      "한계: 스폰서십 미확보로 프로덕션 진입은 미달성.",
      "이점: 자사 앱 내 단일 흐름으로 외부 앱 의존 X, 반복적인 재료 검색 없이 상품 선택에만 집중 가능.",
    ],
    media: [
      {
        type: "video",
        src: "/projects/ai-recipe-search/demo.mp4",
        alt: "데모: 레시피 검색 → 재료 자동 추출 → 멀티 검색 진입 흐름",
      },
    ],
  },
};
