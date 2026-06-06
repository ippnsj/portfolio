import type { Project } from "../types";
import { oodFallbackUXShared } from "./shared";

export const oodFallbackUXKo: Project = {
  ...oodFallbackUXShared,
  title: "배송 불가 지역 사용자 이탈 방지 Fallback UX",
  period: "2025년 11월",
  role: "데이터 기반 핫스팟 분석, Fallback 흐름 설계 및 구현, 성과 측정 설계",
  summary:
    "매장을 찾지 못해 에러 페이지를 마주하던 사용자에게, 에러 대신 대체 매장(branch)을 선택할 수 있는 화면을 제공해 구매 흐름을 회복시킨 Fallback UX. 데이터 분석으로 가장 효과가 큰 지점을 특정한 뒤, 회복 흐름을 설계하고 그 효과를 정확히 측정할 수 있도록 성과 지표까지 설계.",
  background: {
    content: [
      "매장 첫 화면(VLP)이 렌더되려면 여러 의존 API가 모두 성공해야 함. 그중 Vendor Session API는 사용자의 위치로 가장 가까운 매장(Nearest Darkstore)을 찾는데, 이 호출이 실패하면 사용자는 매장에 진입하지 못하고 에러 페이지를 마주함.",
    ],
  },
  problem: {
    content: [
      "VLP SLI가 목표 신뢰도에 못 미치는 상황에서, 어느 지점을 고쳐야 가장 효과가 큰지부터 데이터로 특정해야 했음.",
      "동시에, 매장을 찾지 못한 사용자가 에러 페이지에서 그대로 이탈하는 것을 막고 구매 흐름으로 되돌려야 했음.",
    ],
  },
  keyDecisions: [
    {
      title: "데이터 기반 핫스팟 분석 — 가장 효과 큰 지점 특정",
      description: [
        "VLP 렌더에 필요한 의존 API들을 경로별로 분해해, 어디가 신뢰도를 떨어뜨리는 핵심 병목인지 직접 계산. Vendor Session API를 다시 Branch ID 경로와 Nearest Darkstore 경로로 나눠, RPM 지표를 일일 요청량으로 환산하고 경로별 요청량·에러율을 비교.",
        "Nearest Darkstore는 전체 트래픽의 약 5%에 불과했지만, 요청당 에러율이 다른 경로보다 약 18배 높아 Vendor Session 실패의 약 47%를 차지하는 핫스팟이었음. 트래픽 비중만 보면 작아서 지나치기 쉬운 구간을, 요청당 에러율로 봐야 드러나는 문제로 특정.",
        "그 에러의 약 90%가 `vendor not present in the map` 한 종류였고, 이 단일 에러를 완전히 제거하면 VLP SLI를 최대 약 0.4%p까지 끌어올릴 수 있다는 잠재 효과를 계산 — 가장 적은 노력으로 가장 큰 신뢰도 개선이 가능한 지점임을 데이터로 입증.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/ood-fallback-ux/ko/hotspot-analysis.svg",
          alt: "핫스팟 분석: Vendor Session을 경로별로 분해해 Nearest Darkstore가 트래픽 5%지만 에러율 18배로 실패의 47%를 차지함을 특정",
        },
      ],
    },
    {
      title: "정확한 성과 측정 설계 — 회복을 성공으로 착각하지 않도록",
      description: [
        "Fallback은 실패한 사용자를 대체 매장 선택 화면으로 보내 회복시키는 흐름이라, 자칫 'Fallback 화면을 띄운 것'을 성공으로 집계하면 실제 효과가 부풀려질 위험이 있었음. SLI는 `(valid − failures) / valid`로 측정 (valid는 성공·실패를 모두 포함한 전체 유효 이벤트).",
        "이를 막기 위해, 1차 진입(Vendor Session)에서 실패가 발생하면 그 실패를 그대로 기록하고, 사후에 지우지 않도록 설계. 화면을 대체 매장 선택으로 전환하더라도 원래의 실패는 덮이지 않음 — Fallback 화면에서 매장을 선택하지 않고 이탈하면 1차 실패가 그대로 남음.",
        "대체 매장 선택 후 사용자가 VLP에 진입할 때 valid를 다시 집계하여, VLP가 정상적으로 로드되어 진입에 성공하면 실패 비중이 자연스럽게 희석되고, 다른 이유로 또 실패하면 그 실패가 정확히 누적됨. 이 구조 덕분에 SLI 개선은 측정 조작이 아니라 실제 사용자 회복에서 온 것임이 보장됨.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/ood-fallback-ux/ko/success-measurement.svg",
          alt: "성과 측정 설계: 1차 실패를 지우지 않고 재진입 시 valid를 다시 집계해, 실제 회복 시에만 SLI가 회복되고 또 실패하면 정확히 누적되는 구조",
        },
      ],
    },
  ],
  result: {
    content: [
      "배송 불가·매장 미발견 사용자에게 에러 페이지 대신 대체 매장 선택 화면을 제공해 이탈을 막고 진입 경로를 회복.",
      "데이터 분석으로 `vendor not present in the map` 에러를 회복시키면 VLP SLI를 최대 약 0.4%p까지 개선할 수 있는 여지를 확인.",
    ],
  },
};
