import type { Project } from "../types";
import { brokenImageAutomationShared } from "./shared";

export const brokenImageAutomationKo: Project = {
  ...brokenImageAutomationShared,
  title: "깨진 이미지 자동 리포팅 및 콘텐츠 팀 협업 프로세스 구축",
  period: "2025년 2월 – 3월",
  role: "문제 발견, 자동화 파이프라인 설계 및 구현, 콘텐츠 팀 협업 프로세스 정착",
  summary:
    "상품·배너·매장 이미지가 깨져도 아무도 모르고 방치되던 문제를, 매주 깨진 이미지를 자동으로 수집·리포팅해 콘텐츠 팀이 선제적으로 고치도록 만든 자동화 시스템. 데이터와 수정 주체 사이의 협업 단절을 발견해 파이프라인으로 연결.",
  background: {
    content: [
      "앱에서 상품·배너·매장 이미지가 404 등으로 깨지면, 시각 정보가 사라져 사용자 경험에 직접 타격을 줌. 이미지가 없는 콘텐츠는 사용자의 관심과 참여를 끌기 어려움.",
      "깨진 이미지 발생은 New Relic으로 관측되고 있었지만, 이 데이터를 실제 수정 주체인 콘텐츠 팀에 전달하는 흐름이 없어, 문제가 보여도 고쳐지지 않고 방치되고 있었음.",
    ],
  },
  problem: {
    content: [
      "관측 데이터는 쌓이는데 수정으로 이어지지 않는 단절이 핵심 문제였음. 데이터를 콘텐츠 팀이 실제로 쓸 수 있는 형태로, 정기적으로 전달하는 흐름을 처음부터 만들어야 했음.",
    ],
  },
  keyDecisions: [
    {
      title: "데이터와 수정 주체를 자동 파이프라인으로 연결",
      description: [
        "관측 데이터와 수정 주체 사이에 전달 흐름이 아예 없는 상황이었음. 데이터를 콘텐츠 팀에 정기적으로 전달하는 흐름 자체를 새로 만들되, 사람이 매번 챙기지 않아도 되도록 자동화하기로 함.",
        "이를 매주 자동 실행되는 파이프라인으로 구축해, 수정 대상이 정기적으로 콘텐츠 팀에 도착하도록 만듦.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/broken-image-automation/ko/pipeline.svg",
          alt: "자동 파이프라인: GitHub Actions 스케줄러가 매주 New Relic에서 깨진 이미지를 수집해 Google Sheet에 기록하고 Slack으로 콘텐츠 팀에 알림",
        },
      ],
    },
    {
      title: "콘텐츠 팀 요청 실현 — 중복 로직 없이 branch_id 주입",
      description: [
        "콘텐츠 팀이 수정 대상을 식별하려면 어느 매장의 이미지인지(branch_id)가 필요했음. 하지만 이미지는 앱 곳곳의 수많은 화면에서 쓰여, 모든 사용처가 branch_id를 가져오는 로직을 각자 갖게 만드는 것은 부담이 컸음.",
        "두 가지 대안을 검토함. (1) Provider 주입 — route가 branch_id를 갖고 있는 경우에만 주입할 수 있고, 그렇지 않은 화면에서는 주입할 값 자체가 없어 한계가 있었음. (2) 각 사용처의 BLoC마다 동일한 branch_id 조회 UseCase를 주입 — 가능은 하지만 같은 도메인 조회 로직이 여러 BLoC에 중복되고 수정 범위가 커짐.",
        "대신 Inherited Widget으로 전체 route를 한 번 감싸고, 이 위젯만 domain 계층에서 branch_id를 조회하도록 설계. 하위 화면들은 조회 로직을 따로 갖지 않고 context에서 값을 꺼내기만 하면 됨 — branch_id가 있으면 어디서든 반환하고, 없으면 null. 이미지 관측 데이터에 이 값을 옵셔널로 실어 보내, 중복 로직 없이 콘텐츠 팀이 요청한 식별 정보를 제공.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/broken-image-automation/ko/branch-id-injection.svg",
          alt: "branch_id 주입 설계: Provider는 route에 branch_id가 있을 때만 가능, BLoC마다 UseCase는 중복 발생 — Inherited Widget으로 전체 route를 감싸 한 곳만 domain 조회하고 하위는 context로 꺼냄",
        },
      ],
    },
    {
      title: "재사용 가능한 설계 — 다른 vertical로의 확산",
      description: [
        "처음부터 다른 팀(예: Food)로의 확산을 고려하여, 스크립트·쿼리·설정을 분리. vertical마다 다른 설정값(대상 화면, 알림 받을 팀 등)만 교체하면 쉽고 빠르게 동일한 시스템을 구축할 수 있도록 설계.",
        "구축 과정과 도입 방법을 가이드 문서로 정리해, 다른 팀이 같은 시스템을 빠르게 도입할 수 있게 함.",
      ],
    },
  ],
  result: {
    content: [
      "매주 자동 리포팅으로 콘텐츠 팀의 정기 수정 프로세스를 정착시켜 현재까지 운영 중.",
      "다른 팀의 도입 요청으로 이어질 만큼 조직 내로 확산.",
    ],
  },
};
